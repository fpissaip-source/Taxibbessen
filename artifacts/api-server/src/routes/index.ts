import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bookingsRouter from "./bookings";
import distanceRouter from "./distance";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(bookingsRouter);
router.use(distanceRouter);
router.use(statsRouter);

export default router;
