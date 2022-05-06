import { Request, Response, NextFunction } from "express";

// importamos a interface de criação de um usuário
import { IUserCreate } from "../interfaces/users";

// importação da biblioteca yup
import * as yup from "yup";

// importamos o tipo declarado para os schemas em geral
import { SchemaOf } from "yup";

// note como usamos a interface para especificar o tipo do schema
// em SchemaOf<IUserCreate>
export const userCreateSchema: SchemaOf<IUserCreate> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

// a função recebe o schema como parâmetros
// para fazer a validação
export const validateUserCreateMdw =
  (schema: SchemaOf<IUserCreate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // acessa os dados do corpo da requisição
      const data = req.body;

      // bloco try/catch para capturar erros específicos do yup
      try {
        // chamando o método validate
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          // exclui as chaves que não estão no schema
          stripUnknown: true,
        });

        // adicionamos uma nova chave a requisição, com os dados validados do usuario
        req.newUser = validatedData;

        next();
      } catch (err: any) {
        // caso algum erro do yup aconteca,
        // ele vai ser tratado e enviado ao usuario
        return res.status(400).json({
          error: err.errors?.join(", "),
        });
      }
    } catch (err) {
      next(err);
    }
  };
