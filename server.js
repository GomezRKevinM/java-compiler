const express = require('express');
const { exec } = require('child_process');
const fs = require('fs/promises');
const path = require('path');

const app = express();
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para compilar y ejecutar código Java
app.post('/compile', async (req, res) => {
    const { code } = req.body;
    const filename = `Main.java`;
    const filepath = path.join(__dirname, filename);

    try {
        // Guardar el código en un archivo Java
        await fs.writeFile(filepath, code);

        // Ejecutar el código Java en un contenedor Docker
        exec(
            `docker run --rm -v ${__dirname}:/usr/src/myapp -w /usr/src/myapp openjdk:latest bash -c "javac ${filename} && java Main"`,
            (error, stdout, stderr) => {
                if (error) {
                    res.json({ output: stderr || error.message });
                } else {
                    res.json({ output: stdout });
                }
            }
        );
    } catch (err) {
        res.status(500).json({ output: `Error: ${err.message}` });
    }
});

// Iniciar el servidor en el puerto 3000
app.listen(3001, () => console.log('Server running on http://localhost:3001'));
