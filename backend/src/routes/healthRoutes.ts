import {Router} from "express";
import{ getDBHealth , getAPIHealth} from "../Controllers/healthController";

const router= Router();

router.use("/test-db", getDBHealth);
router.use("/api/health", getAPIHealth);

export default router;