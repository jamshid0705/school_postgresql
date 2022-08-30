const pool = require("../config/database");
const catchError = require("../utility/catchError");

const getAll = catchError(async (req, res, next) => {
  const data = await pool.query(
    "SELECT class.name AS class_name,school.name AS school_name FROM class JOIN school ON class.school_id=school.id"
  );

  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

const add = catchError(async (req, res, next) => {
  const data = await pool.query(
    "INSERT INTO class(name,school_id) VALUES($1,$2) RETURNING *",
    [req.body.name,req.body.school_id]
  );
  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

const getOne = catchError(async (req, res) => {
  const data = await pool.query(
    "SELECT class.name AS class_name,school.name AS school_name FROM class JOIN school ON class.school_id=school.id WHERE id=$1",
    [req.params.id]
  );

  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

const update = catchError(async (req, res) => {
  const old = await pool.query("SELECT * FROM class WHERE id=$1", [
    req.params.id,
  ]);
  console.log(old.rows);
  const data = await pool.query(
    "UPDATE school SET name=$1,school_id=$2 WHERE id=$3 RETURNING *",
    [req.body.name || old.rows.name,
     req.body.school_id || old.rows.school_id,
     req.params.id]
  );

  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

const deleteClass = catchError(async (req, res) => {
  const data = await pool.query("DELETE FROM class WHERE id=$1 RETURNING *", [
    req.params.id,
  ]);

  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

module.exports = { getAll, add, getOne, deleteClass, update };
