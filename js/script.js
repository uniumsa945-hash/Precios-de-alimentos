document.addEventListener('DOMContentLoaded', () => {
    
    // Selectores del DOM (Formulario)
    const form = document.getElementById('form-simulador');
    const inputProducto = document.getElementById('producto');
    const inputPrecioAnterior = document.getElementById('precio-anterior');
    const inputPrecioActual = document.getElementById('precio-actual');
    const inputCantidad = document.getElementById('cantidad');
    const inputSemanas = document.getElementById('semanas');
    
    // Selectores del DOM (Botones)
    const btnCalcular = document.getElementById('btn-calcular');
    const btnLimpiar = document.getElementById('btn-limpiar');
    
    // Selectores del DOM (Contenedor Resultados)
    const sectionResultados = document.getElementById('resultados');
    const alertaStatus = document.getElementById('alerta-status');
    
    // Elementos donde se inyectan los datos calculados
    const resProducto = document.getElementById('res-producto');
    const resIncremento = document.getElementById('res-incremento');
    const resPorcentaje = document.getElementById('res-porcentaje');
    const resSemanalAnt = document.getElementById('res-semanal-ant');
    const resSemanalAct = document.getElementById('res-semanal-act');
    const resTotalAnt = document.getElementById('res-total-ant');
    const resTotalAct = document.getElementById('res-total-act');
    const resDiferencia = document.getElementById('res-diferencia');

    // Manejador del Evento Calcular
    btnCalcular.addEventListener('click', () => {
        
        // 1. Captura de datos y conversión de tipos
        const producto = inputProducto.value.trim();
        const precioAnterior = parseFloat(inputPrecioAnterior.value);
        const precioActual = parseFloat(inputPrecioActual.value);
        const cantidadSemanal = parseInt(inputCantidad.value);
        const semanas = parseInt(inputSemanas.value);

        // 2. Validaciones básicas de datos
        if (!producto || isNaN(precioAnterior) || isNaN(precioActual) || isNaN(cantidadSemanal) || isNaN(semanas)) {
            alert('Por favor, complete todos los campos con valores válidos.');
            return;
        }

        if (precioAnterior <= 0 || precioActual <= 0 || cantidadSemanal <= 0 || semanas <= 0) {
            alert('Los números ingresados deben ser mayores a cero.');
            return;
        }

        // 3. Procesamiento y Cálculos Matemáticos
        const incrementoUnidad = precioActual - precioAnterior;
        const porcentajeAumento = (incrementoUnidad / precioAnterior) * 100;
        
        const gastoSemanalAnterior = precioAnterior * cantidadSemanal;
        const gastoSemanalActual = precioActual * cantidadSemanal;
        
        const gastoTotalAnterior = gastoSemanalAnterior * semanas;
        const gastoTotalActual = gastoSemanalActual * semanas;
        const diferenciaGastoTotal = gastoTotalActual - gastoTotalAnterior;

        // 4. Inyección de valores en el DOM (Resultados)
        resProducto.textContent = producto;
        resIncremento.textContent = `${incrementoUnidad.toFixed(2)} Bs`;
        resPorcentaje.textContent = `${porcentajeAumento.toFixed(1)}%`;
        resSemanalAnt.textContent = `${gastoSemanalAnterior.toFixed(2)} Bs`;
        resSemanalAct.textContent = `${gastoSemanalActual.toFixed(2)} Bs`;
        resTotalAnt.textContent = `${gastoTotalAnterior.toFixed(2)} Bs`;
        resTotalAct.textContent = `${gastoTotalActual.toFixed(2)} Bs`;
        resDiferencia.textContent = `${diferenciaGastoTotal.toFixed(2)} Bs`;

        // 5. Manejo dinámico de Alertas y Estilos visuales según porcentaje de aumento
        sectionResultados.classList.remove('hidden'); // Mostrar sección resultados
        
        // Reiniciamos clases de estilo dinámico previos
        alertaStatus.style.backgroundColor = '';
        alertaStatus.style.color = '';

        if (porcentajeAumento <= 0) {
            alertaStatus.textContent = 'SITUACIÓN NORMAL: El precio se mantuvo o disminuyó.';
            alertaStatus.style.backgroundColor = '#c6f6d5'; // Verde pastel
            alertaStatus.style.color = '#22543d';
        } else if (porcentajeAumento > 0 && porcentajeAumento <= 20) {
            alertaStatus.textContent = 'SITUACIÓN EN ALERTA: Incremento moderado. Se sugiere vigilar los gastos.';
            alertaStatus.style.backgroundColor = '#feebc8'; // Amarillo/Naranja pastel
            alertaStatus.style.color = '#744210';
        } else {
            alertaStatus.textContent = 'CRÍTICO: ¡Incremento severo de precios! El presupuesto familiar se ve fuertemente afectado.';
            alertaStatus.style.backgroundColor = '#fed7d7'; // Rojo pastel
            alertaStatus.style.color = '#742a2a';
        }

        // Desplazar la ventana automáticamente hacia los resultados generados
        sectionResultados.scrollIntoView({ behavior: 'smooth' });
    });

    // Manejador del Evento Limpiar Formulario
    btnLimpiar.addEventListener('click', () => {
        form.reset();
        sectionResultados.classList.add('hidden');
    });
});