import e, { Request, Response, NextFunction } from "express";


export const AuthCNPJ = (req: Request, res: Response, next: NextFunction) =>{
    const { CNPJ } = req.body;

    if (!CNPJ) {
        return res.status(400).json("CNPJ não informado");
    }

    if (CNPJ.length !== 14) {
        return res.status(400).json("CNPJ inválido");
    }

    /// OUTRAS VALIDAÇÕES DO CNPJ NO FUTURO
    next();
}