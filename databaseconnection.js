import mongoose from "mongoose";

async function connect() {
    mongoose.set("strictQuery", true);

    const primaryUrl = process.env.MONGO_URL || process.env.MONGO_URI;
    const fallbackUrl = process.env.MONGO_URL_FALLBACK;

    if (!primaryUrl) {
        console.error("MongoDB URI is missing. Set MONGO_URL in your .env file.");
        return { connected: false, mode: "none", reason: "missing-uri" };
    }

    try {
        await mongoose.connect(primaryUrl);
        console.log("Connected to MongoDB successfully (SRV URI).");
        return { connected: true, mode: "srv" };
    } catch (error) {
        const isSrvLookupFailure =
            error?.code === "ECONNREFUSED" ||
            String(error?.message || "").includes("querySrv");

        if (isSrvLookupFailure && fallbackUrl) {
            console.warn("SRV lookup failed. Retrying with fallback MongoDB URI...");

            try {
                await mongoose.connect(fallbackUrl);
                console.log("Connected to MongoDB successfully (fallback URI).");
                return { connected: true, mode: "fallback" };
            } catch (fallbackError) {
                console.error("MongoDB fallback connection failed:", fallbackError.message);
                return {
                    connected: false,
                    mode: "fallback",
                    reason: fallbackError.message,
                };
            }
        }

        console.error("MongoDB connection failed:", error.message);
        return { connected: false, mode: "srv", reason: error.message };
    }
}

export default connect;
