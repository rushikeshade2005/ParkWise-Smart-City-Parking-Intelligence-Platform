import Booking from "../models/Booking.model.js";
import { Parser } from "json2csv";
import PDFDocument from "pdfkit";

/**
 * @desc Download revenue report as CSV
 * @route GET /api/reports/revenue/csv
 */
export const downloadRevenueCSV = async (req, res) => {
  try {
    const bookings = await Booking.find({
      paymentStatus: "SUCCESS",
    }).populate("user parkingSlot");

    const fields = ["_id", "totalAmount", "createdAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(bookings);

    res.header("Content-Type", "text/csv");
    res.attachment("revenue-report.csv");
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Download revenue report as PDF
 * @route GET /api/reports/revenue/pdf
 */
export const downloadRevenuePDF = async (req, res) => {
  try {
    const bookings = await Booking.find({
      paymentStatus: "SUCCESS",
    });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=revenue-report.pdf");

    doc.pipe(res);

    doc.fontSize(18).text("ParkWise Revenue Report", { align: "center" });
    doc.moveDown();

    bookings.forEach((booking, index) => {
      doc
        .fontSize(12)
        .text(
          `${index + 1}. Booking ID: ${booking._id} | Amount: ₹${booking.totalAmount}`
        );
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};