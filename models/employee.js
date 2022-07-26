module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your name",
        },
      },
    },
    phone: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your phone number",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your password",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  Employee.associate = (models) => {
    Employee.belongsTo(models.Company, {
      foreignKey: "company_id",
    });
  };
  return Employee;
};
