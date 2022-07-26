module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define("Company", {
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Please enter company name",
        },
      },
    },
  });
  Company.associate = (models) => {
    Company.hasMany(models.Employee, {
      foreignKey: "company_id",
    });
  };
  return Company;
};
