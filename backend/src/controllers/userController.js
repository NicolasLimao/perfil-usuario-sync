const db = require('../config/db.js');

const getUsuario = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [1]);
        if (rows.length === 0) {
            return res.status(404).json({ message:'Usuário não encontrado.' });
        }    
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao encontrar o usuário:', error);
        res.status(500).json({message: 'Erro interno do servidor ao buscar o usuário.'});
    }
};

const updateUsuario = async (req, res) => {
    try {
        const { nome_completo, idade, rua, bairro, estado, biografia, imagem_perfil_url: url_antiga } = req.body;
        const id = 1;

        let url_final_da_imagem = url_antiga; 

       if (req.file) {
            url_final_da_imagem = `http://localhost:3001/uploads/${req.file.filename}`;
        }

        const query = `
            UPDATE usuarios
            SET 
                nome_completo = ?, 
                idade = ?, 
                rua = ?, 
                bairro = ?, 
                estado = ?, 
                biografia = ?, 
                imagem_perfil_url = ?
                WHERE id = ?
            `;
        
        await db.query(query, [
            nome_completo, 
            idade, 
            rua, 
            bairro, 
            estado, 
            biografia, 
            url_final_da_imagem,
            id
        ]);

        res.status(200).json({ message: 'Dados atualizados com sucesso!' });

    } catch (error) {
        console.error('Erro ao atualizar os dados do usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports = {
    getUsuario,
    updateUsuario
};
