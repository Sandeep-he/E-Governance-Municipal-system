// cronJobs.js
const Complaint = require('./model/complaintsModel').Complaint;
const Warning = require('./model/warningModel');

let dbReady = false;

// Wait until Mongoose fully connects
setTimeout(() => {
    dbReady = true;
}, 1500);

// Run every 10 seconds
const intervalMs = 10 * 1000;

function toDateOnlyString(d) {
  const year = d.getFullYear();
  const m = d.getMonth() + 1;
  const date = d.getDate();
  return `${year}-${(m<10?'0':'')+m}-${(date<10?'0':'')+date}`;
}

setInterval(async () => {
  if (!dbReady) return; // don't run before DB is ready

  try {
    const now = new Date();
    const todayStr = toDateOnlyString(now);

    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const tomorrowStr = toDateOnlyString(tomorrow);

    // ----------- WARNINGS -------------
    const complaintsForWarning = await Complaint.find({
      complaint_status: { $ne: 'Resolved' },
      estimated_time: { $lte: tomorrowStr, $gt: todayStr }
    }).lean();

    for (const c of complaintsForWarning) {
      await Warning.findOneAndUpdate(
        { complaint_number: c.complaint_number },
        {
          complaint_number: c.complaint_number,
          notification: '1 day Remain'
        },
        { upsert: true }
      );
    }

    // ----------- MEDIUM PRIORITY -------------
    const after2Days = new Date(now);
    after2Days.setDate(now.getDate() + 2);
    const after2DaysStr = toDateOnlyString(after2Days);

    const mediumCandidates = await Complaint.find({
      complaint_status: { $ne: 'Resolved' },
      estimated_time: { $lte: after2DaysStr, $gt: tomorrowStr }
    });

    for (const mc of mediumCandidates) {
      if (mc.priority !== 'medium') {
        mc.priority = 'medium';
        await mc.save();
      }
    }

    // ----------- HIGH PRIORITY -------------
    const highCandidates = await Complaint.find({
      complaint_status: { $ne: 'Resolved' },
      estimated_time: { $lte: tomorrowStr, $gt: todayStr }
    });

    for (const hc of highCandidates) {
      if (hc.priority !== 'high') {
        hc.priority = 'high';
        await hc.save();
      }
    }

  } catch (err) {
    console.error("CRON ERROR:", err);
  }

}, intervalMs);
