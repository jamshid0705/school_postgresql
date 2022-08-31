const pool = require("../config/database");
const catchError = require("../utility/catchError");

const getAll = catchError(async (req, res, next) => {
  const data = await pool.query(
    "SELECT fanlar.title AS fanlar_title,class.name AS class_name FROM fanlar JOIN class ON fanlar.class_id=class.id"
  );

  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

const add = catchError(async (req, res, next) => {
  const data = await pool.query(
    "INSERT INTO fanlar(title,class_id) VALUES($1,$2) RETURNING *",
    [req.body.title, req.body.class_id]
  );
  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

const getOne = catchError(async (req, res) => {
  const data = await pool.query(
    "SELECT fanlar.title AS fanlar.class_id,class.name AS class_name FROM fanlar JOIN class ON fanlar.class_id=class.id WHERE id=$1",
    [req.params.id]
  );

  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

const update = catchError(async (req, res) => {
  const old = await pool.query("SELECT * FROM fanlar WHERE id=$1", [
    req.params.id,
  ]);
  console.log(old.rows);
  const data = await pool.query(
    "UPDATE fanlar SET title=$1,school_id=$2 WHERE id=$3 RETURNING *",
    [
      req.body.title || old.rows.title,
      req.body.class_id || old.rows.class_id,
      req.params.id,
    ]
  );

  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

const deleteFan = catchError(async (req, res) => {
  const data = await pool.query(
    "DELETE FROM fanlar WHERE id=$1 RETURNING *",
    [req.params.id]
  );

  res.status(200).json({
    status: "success",
    data: data.rows,
  });
});

module.exports = { getAll, add, getOne, deleteFan, update };
