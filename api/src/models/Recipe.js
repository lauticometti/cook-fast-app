const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', { 
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false
    },
    createdOnDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true  
    }
  },
  {
    timestamps: false
  }
  );
};
// TODO: MAKE A ATTRIBUTE 'createdOnDB'