import { Router } from 'express';
import { check } from 'express-validator';
import { consulta, getAllConsultas } from '../controllers/consulta.controller';
import { validarCampos } from '../middlewares/validarCampos';

const router = Router();

// Obtener todas las consultas
router.get('/consultas', [], getAllConsultas);

// Crear nueva consulta con validaciones
router.post(
  '/consultas',
  [
    check('fullName', 'El nombre completo es obligatorio').notEmpty(),
    check('documentId', 'El número de documento es obligatorio').notEmpty(),
    check('phone', 'El número de teléfono es obligatorio').notEmpty(),
    check('problemDescription', 'La descripción del problema es obligatoria').notEmpty(),
    check('town', 'El municipio de residencia es obligatorio').notEmpty(),
    check('email', 'El correo electrónico debe ser válido').optional().isEmail(),
    validarCampos
  ],
  consulta
);

export default router;
