/**
 * Utilitário para validação de dados usando Joi
 */

const Joi = require('joi');
const { AppError } = require('../middlewares/errorHandler');

/**
 * Middleware para validar dados da requisição com Joi
 * @param {Object} schema - Schema Joi para validação
 * @param {string} source - Fonte dos dados (body, params, query)
 * @returns {Function} Middleware Express
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return next(new AppError(errorMessage, 400));
    }

    // Atualizar os dados validados
    req[source] = value;
    next();
  };
};

/**
 * Schemas de validação para autenticação
 */
const authSchemas = {
  login: Joi.object({
    username: Joi.string().required().messages({
      'string.empty': 'Nome de usuário é obrigatório',
      'any.required': 'Nome de usuário é obrigatório'
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Senha é obrigatória',
      'any.required': 'Senha é obrigatória'
    })
  }),
  
  register: Joi.object({
    username: Joi.string().min(3).max(50).required().messages({
      'string.empty': 'Nome de usuário é obrigatório',
      'string.min': 'Nome de usuário deve ter pelo menos {#limit} caracteres',
      'string.max': 'Nome de usuário deve ter no máximo {#limit} caracteres',
      'any.required': 'Nome de usuário é obrigatório'
    }),
    fullName: Joi.string().min(3).max(100).required().messages({
      'string.empty': 'Nome completo é obrigatório',
      'string.min': 'Nome completo deve ter pelo menos {#limit} caracteres',
      'string.max': 'Nome completo deve ter no máximo {#limit} caracteres',
      'any.required': 'Nome completo é obrigatório'
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email é obrigatório',
      'string.email': 'Email inválido',
      'any.required': 'Email é obrigatório'
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Senha é obrigatória',
      'string.min': 'Senha deve ter pelo menos {#limit} caracteres',
      'any.required': 'Senha é obrigatória'
    }),
    phone: Joi.string().allow('', null),
    isAdmin: Joi.boolean().default(false)
  }),
  
  updateUser: Joi.object({
    fullName: Joi.string().min(3).max(100).messages({
      'string.min': 'Nome completo deve ter pelo menos {#limit} caracteres',
      'string.max': 'Nome completo deve ter no máximo {#limit} caracteres'
    }),
    email: Joi.string().email().messages({
      'string.email': 'Email inválido'
    }),
    password: Joi.string().min(6).allow('', null).messages({
      'string.min': 'Senha deve ter pelo menos {#limit} caracteres'
    }),
    phone: Joi.string().allow('', null),
    isAdmin: Joi.boolean()
  }),
  
  updatePermissions: Joi.object({
    moduleIds: Joi.array().items(Joi.number().integer().positive()).required().messages({
      'array.base': 'Lista de IDs de módulos deve ser um array',
      'any.required': 'Lista de IDs de módulos é obrigatória'
    })
  })
};

/**
 * Schemas de validação para depoimentos
 */
const testimonialSchemas = {
  create: Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Nome é obrigatório',
      'any.required': 'Nome é obrigatório'
    }),
    location: Joi.string().required().messages({
      'string.empty': 'Localização é obrigatória',
      'any.required': 'Localização é obrigatória'
    }),
    category: Joi.string().required().messages({
      'string.empty': 'Categoria é obrigatória',
      'any.required': 'Categoria é obrigatória'
    }),
    testimonial: Joi.string().required().messages({
      'string.empty': 'Depoimento é obrigatório',
      'any.required': 'Depoimento é obrigatório'
    }),
    is_available_for_frontend: Joi.boolean().default(false)
  }),
  
  update: Joi.object({
    name: Joi.string().messages({
      'string.empty': 'Nome não pode estar vazio'
    }),
    location: Joi.string().messages({
      'string.empty': 'Localização não pode estar vazia'
    }),
    category: Joi.string().messages({
      'string.empty': 'Categoria não pode estar vazia'
    }),
    testimonial: Joi.string().messages({
      'string.empty': 'Depoimento não pode estar vazio'
    }),
    is_available_for_frontend: Joi.boolean()
  })
};

/**
 * Schemas de validação para postais
 */
const postcardSchemas = {
  create: Joi.object({
    title: Joi.object({
      pt: Joi.string().required().messages({
        'string.empty': 'Título em português é obrigatório',
        'any.required': 'Título em português é obrigatório'
      }),
      en: Joi.string().allow('', null),
      es: Joi.string().allow('', null)
    }).required(),
    description: Joi.object({
      pt: Joi.string().required().messages({
        'string.empty': 'Descrição em português é obrigatória',
        'any.required': 'Descrição em português é obrigatória'
      }),
      en: Joi.string().allow('', null),
      es: Joi.string().allow('', null)
    }).required(),
    category: Joi.string().required().messages({
      'string.empty': 'Categoria é obrigatória',
      'any.required': 'Categoria é obrigatória'
    }),
    is_available_for_frontend: Joi.boolean().default(false)
  }),
  
  update: Joi.object({
    title: Joi.object({
      pt: Joi.string().messages({
        'string.empty': 'Título em português não pode estar vazio'
      }),
      en: Joi.string().allow('', null),
      es: Joi.string().allow('', null)
    }),
    description: Joi.object({
      pt: Joi.string().messages({
        'string.empty': 'Descrição em português não pode estar vazia'
      }),
      en: Joi.string().allow('', null),
      es: Joi.string().allow('', null)
    }),
    category: Joi.string().messages({
      'string.empty': 'Categoria não pode estar vazia'
    }),
    is_available_for_frontend: Joi.boolean()
  })
};

/**
 * Schemas de validação para biblioteca
 */
const bibliotecaSchemas = {
  create: Joi.object({
    title: Joi.object({
      pt: Joi.string().required().messages({
        'string.empty': 'Título em português é obrigatório',
        'any.required': 'Título em português é obrigatório'
      }),
      en: Joi.string().allow('', null),
      es: Joi.string().allow('', null)
    }).required(),
    description: Joi.object({
      pt: Joi.string().required().messages({
        'string.empty': 'Descrição em português é obrigatória',
        'any.required': 'Descrição em português é obrigatória'
      }),
      en: Joi.string().allow('', null),
      es: Joi.string().allow('', null)
    }).required(),
    category: Joi.string().required().messages({
      'string.empty': 'Categoria é obrigatória',
      'any.required': 'Categoria é obrigatória'
    }),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required().messages({
      'number.base': 'Ano deve ser um número',
      'number.integer': 'Ano deve ser um número inteiro',
      'number.min': 'Ano deve ser maior ou igual a {#limit}',
      'number.max': 'Ano deve ser menor ou igual a {#limit}',
      'any.required': 'Ano é obrigatório'
    }),
    is_available_for_frontend: Joi.boolean().default(false)
  }),
  
  update: Joi.object({
    title: Joi.object({
      pt: Joi.string().messages({
        'string.empty': 'Título em português não pode estar vazio'
      }),
      en: Joi.string().allow('', null),
      es: Joi.string().allow('', null)
    }),
    description: Joi.object({
      pt: Joi.string().messages({
        'string.empty': 'Descrição em português não pode estar vazia'
      }),
      en: Joi.string().allow('', null),
      es: Joi.string().allow('', null)
    }),
    category: Joi.string().messages({
      'string.empty': 'Categoria não pode estar vazia'
    }),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).messages({
      'number.base': 'Ano deve ser um número',
      'number.integer': 'Ano deve ser um número inteiro',
      'number.min': 'Ano deve ser maior ou igual a {#limit}',
      'number.max': 'Ano deve ser menor ou igual a {#limit}'
    }),
    is_available_for_frontend: Joi.boolean()
  })
};

module.exports = {
  validate,
  authSchemas,
  testimonialSchemas,
  postcardSchemas,
  bibliotecaSchemas
};
