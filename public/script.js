window.onload = function() {
    const editor = CodeMirror(document.getElementById("editor"), {
        mode: "java",               // Modo de Java
        theme: "dracula",           // Tema de CodeMirror (opcional)
        lineNumbers: true,          // Mostrar números de línea
        tabSize: 4,                 // Tamaño de la tabulación
        indentUnit: 4,              // Unidad de indentación
        smartIndent: true,          // Indentación automática
        lineWrapping: false,         // Ajuste de línea
        extraKeys: {
            "Ctrl-Space": "autocomplete"  // Activar auto-completado
        },
        hintOptions: {
            completeSingle: true, // No completar automáticamente al seleccionar una sugerencia
        }
        
    });
    editor.getWrapperElement().classList.add("custom-codemirror");
    const defaultCode = `public class Main {
        public static void main(String[] args) {
            // Código aquí
        }
    }`;
    
    // Establecer el valor predeterminado en el editor
    editor.setValue(defaultCode);

    // Verificar que 'editor' es el objeto de CodeMirror
    console.log(editor);

    // Ahora, cuando el editor se haya inicializado correctamente, puedes obtener el valor
    async function compileCode() {
        const code = editor.getValue();  // Este es el método correcto para obtener el código
        const outputElement = document.getElementById('output');
        
        if (!code.trim()) {
            outputElement.textContent = 'Por favor, ingresa algo de código Java.';
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/compile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            });

            const data = await response.json();
            outputElement.textContent = data.output || 'Error al compilar o ejecutar el código.';
        } catch (error) {
            outputElement.textContent = 'Error de conexión con el servidor.';
        }
    }

    // Asignar el evento al botón de compilación
    document.querySelector('button').addEventListener('click', compileCode);
};
