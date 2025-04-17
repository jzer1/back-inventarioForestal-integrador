const db = require('../BD/connection')

exports.obtenerColeccionBotanico = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Falta el campo ' });
    }
  
  
    try {
      const [rows] = await db.query(
        'SELECT cb.id, cb.tamano, cb.nombre_comun, cb.nombre_cientifico, cb.observaciones_individuo, cb.foto, cb.idArbol FROM conglomerado c JOIN subparcela s ON c.id = s.idConglomerado JOIN ColeccionBotanico cb ON s.id = cb.idSubParcela WHERE c.id = ?',
        [id]
      );
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener la colección botánica:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
  

  exports.obtenerSubParcelasColeccionBotanico = async (req, res) => {
    const { id, idSubParcela } = req.params;

    if (!id ||! idSubParcela) {
        return res.status(400).json({ error: 'Falta el campo ' });
    }
  
  
    try {
      const [rows] = await db.query(
        'SELECT cb.id, cb.tamano, cb.nombre_comun, cb.nombre_cientifico, cb.observaciones_individuo, cb.foto, cb.idArbol FROM conglomerado c JOIN subparcela s ON c.id = s.idConglomerado JOIN ColeccionBotanico cb ON s.id = cb.idSubParcela WHERE c.id = ? AND s.id = ?',
        [id, idSubParcela]
      );
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener por subparcela:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
  

  exports.obtenerCantidadColeccionBotanico = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Falta el campo ' });
    }
  
  
    try {
      const [rows] = await db.query(
        'SELECT COUNT(cb.id) AS total_coleccion FROM conglomerado c JOIN subparcela s ON c.id = s.idConglomerado JOIN ColeccionBotanico cb ON s.id = cb.idSubParcela WHERE c.id = ?',
        [id]
      );
      res.json(rows[0]);
    } catch (error) {
      console.error('Error al contar la colección botánica:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
  

  exports.agregarColeccionBotanico = async (req, res) => {
    const {
      tamano,
      nombre_comun,
      nombre_cientifico,
      observaciones_individuo,
      foto,
      idArbol,
      idSubParcela
    } = req.body;
  
    if (!tamano || !nombre_comun || !nombre_cientifico || !observaciones_individuo || !foto || !idArbol || !idSubParcela) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
  
    try {
      const result = await db.query(
        'INSERT INTO ColeccionBotanico (tamano, nombre_comun, nombre_cientifico, observaciones_individuo, foto, idArbol, idSubParcela) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?)',
        [tamano, nombre_comun, nombre_cientifico, observaciones_individuo, foto, idArbol, idSubParcela]
      );
  
      res.status(201).json({ mensaje: 'Registro agregado exitosamente', idInsertado: result.insertId });
    } catch (error) {
      console.error('Error al agregar colección botánica:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
  
  