const pool = require("../config/database");
const catchError = require("../utility/catchError");

const getAll = catchError(async (req, res, next) => {
  const data = await pool.query("SELECT * FROM school");

  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

const add = catchError(async (req, res, next) => {
  console.log(req.body);
  const data = await pool.query(
    "INSERT INTO school(name) VALUES($1) RETURNING *",
    [req.body.name]
  );
  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

const getOne = catchError(async (req, res) => {
  const data = await pool.query("SELECT * FROM school WHERE id=$1", [
    req.params.id,
  ]);

  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

const update = catchError(async (req, res) => {
  const old = await pool.query("SELECT * FROM school WHERE id=$1", [
    req.params.id,
  ]);
  console.log(old.rows);
  const data = await pool.query(
    "UPDATE school SET name=$1 WHERE id=$2 RETURNING *",
    [req.body.name || old.rows.name, req.params.id]
  );

  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

const deleteSchool = catchError(async (req, res) => {
  const data = await pool.query("DELETE FROM school WHERE id=$1 RETURNING *", [
    req.params.id,
  ]);

  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

module.exports = { getAll, add, getOne, deleteSchool, update };
