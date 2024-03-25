const ExcelJs = require('exceljs');

// Função para converter hora no formato HH:mm para decimal com vírgula (ex: 7:45 para 7,45)
function converterHoraParaDecimal(horaString) {
    const [horas, minutos] = horaString.split(':').map(Number);
    return horas + minutos / 100;
}

function converterParaHoraMinuto(value) {
    let numero = Number(value).toFixed(2);
    let horas = numero.substring(0, numero.indexOf('.'));
    let minutos = numero.substring(numero.indexOf('.') + 1);
    minutos = '00' + (Number.parseInt(minutos) / 1.67).toFixed(0).trim();
    minutos = minutos.substring(minutos.length - 2);
    if (minutos.length < 2) minutos = '0' + minutos;
    return horas + ',' + minutos;
}

async function generateExcel(lsApontamentos) {
    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet('Imobilizado', {
        views: [{ showGridLines: false }], // oculta as linhas de grade
    });

    const horasPorAuditor = {};
    let totalHorasApontadas = 0; // Variável para armazenar a soma das horas apontadas

    try {
        // Merge das células para o título
sheet.mergeCells('D5');
// Adiciona o título na célula D5
const titleCell = sheet.getCell('D3');
titleCell.value = "Apontamentos das Atividades";
titleCell.font = { bold: true, size: 18 }; // fonte em negrito e tamanho
titleCell.alignment = { horizontal: 'center', vertical: 'bottom' }; // alinhamento horizontal e vertical
titleCell.height = 30; // altura

// Incrementa o índice de linha após adicionar o título para pular uma linha
let rowIndex = 6;

console.log('Título definido com sucesso.');

// add títulos
const titles = [
    'Auditor', 'Responsável', 'Projeto', 'Descrição do Projeto',
    'Descrição do Motivo','Entrada', 'Saída', 'Horas Apontadas',
    'Cliente', 'Observação','Diretor', 'Data Inicial', 'Data Final'
];
sheet.addRow(titles);

// Incrementa o índice de linha após adicionar os títulos
rowIndex++;

// Inicializa o índice de linha com 7 para começar a partir da linha 7
rowIndex = 7;

        for await (const registro of lsApontamentos) {
            console.log('Adicionando registro:', registro);

            // Extrair apenas a hora e os minutos da data inicial
            const horaInicial = registro.inicial ? new Date(registro.inicial).getHours() : 0;
            const minutosInicial = registro.inicial ? new Date(registro.inicial).getMinutes() : 0;

            // Extrair apenas a hora e os minutos da data final
            const horaFinal = registro.final ? new Date(registro.final).getHours() : 0;
            const minutosFinal = registro.final ? new Date(registro.final).getMinutes() : 0;

            // Calcular o total de minutos com base na diferença entre a hora inicial e final
            const minutosInicialTotal = horaInicial * 60 + minutosInicial;
            const minutosFinalTotal = horaFinal * 60 + minutosFinal;
            const minutosTotal = minutosFinalTotal - minutosInicialTotal;

            // Log dos valores de horasapon antes da conversão
            console.log('Valor de horasapon antes da conversão:', registro.horasapon);

            // Converter horasapon para número
            const horasApontadasNumero = parseFloat(registro.horasapon || 0);
            console.log('Valor de horasapon após conversão para número:', horasApontadasNumero);

            const horasApontadasDecimal = converterParaHoraMinuto(horasApontadasNumero);
            console.log('Valor de horas e minutos após a conversão para decimal:', horasApontadasDecimal);

            // Adiciona os dados na linha correspondente ao índice de linha
            const row = sheet.addRow([
                registro.exec_razao || '',
                registro.resp_razao || '',
                registro.id_projeto || '',
                registro.proj_descricao || '',
                registro.mmotivo_descricao || '',
                converterHoraParaDecimal(`${horaInicial}:${minutosInicial}`) || 0,
                converterHoraParaDecimal(`${horaFinal}:${minutosFinal}`) || 0,
                horasApontadasDecimal || '0,00',
                registro.cli_razao || '',
                registro.obs || '',
                registro.dir_razao || '',
                registro.inicial ? new Date(registro.inicial) : '', // Formata a data inicial
                registro.final ? new Date(registro.final) : '',     // Formata a data final
            ]);

            totalHorasApontadas += registro.horasapon || 0; // Atualiza o total das horas apontadas

            console.log('Total de horas calculado e inserido com sucesso.');

            // Defina a largura da coluna de datas manualmente
            sheet.getColumn(12).width = 12; // Coluna de Data Inicial
            sheet.getColumn(13).width = 12; // Coluna de Data Final

            row.eachCell((cell) => { // Correção aqui
                // Aplica formatação apenas para as células de dados, excluindo os títulos
                if (rowIndex > 6) {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                    cell.height = 15;
                }
            });

            // Incrementa o índice de linha após adicionar os dados de um registro
            rowIndex++;
        };

            // Adiciona uma linha em branco antes de inserir os nomes dos auditores
    rowIndex++;
    rowIndex++;
    rowIndex++;

    // Adiciona os totais de horas por auditor abaixo dos dados
    const auditores = Array.from(new Set(lsApontamentos.map(registro => registro.exec_razao)));
    const totalPorAuditor = {};

    const titleStyle = {
        font: { bold: true },
        alignment: { horizontal: 'center', vertical: 'middle' },
        border: { bottom: { style: 'thin' } },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC0C0C0' } }
    };

    const totalStyle = {
        font: { bold: true },
        alignment: { horizontal: 'center', vertical: 'middle' },
        border: { top: { style: 'double' }, bottom: { style: 'double' } },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC0C0C0' } }
    };

    sheet.getCell(`A${rowIndex}`).value = 'Auditor';
    sheet.getCell(`B${rowIndex}`).value = 'Total de Horas';
    sheet.getCell(`A${rowIndex}`).style = titleStyle;
    sheet.getCell(`B${rowIndex}`).style = titleStyle;
    rowIndex++;

    auditores.forEach((auditor, index) => {
        let totalHorasPorAuditor = 0;

        lsApontamentos.forEach(registro => {
            if (registro.exec_razao === auditor) {
                const horasApontadasNumero = parseFloat(registro.horasapon || 0);
                totalHorasPorAuditor += horasApontadasNumero;
            }
        });

        totalPorAuditor[auditor] = totalHorasPorAuditor;

        sheet.getCell(`A${rowIndex}`).value = `${auditor}`;
        sheet.getCell(`B${rowIndex}`).value = converterParaHoraMinuto(totalHorasPorAuditor);
        sheet.getCell(`A${rowIndex}`).style = {
            border: { bottom: { style: 'thin' } }
        };
        sheet.getCell(`B${rowIndex}`).style = {
            border: { bottom: { style: 'thin' } }
        };

        if (index === auditores.length - 1) {
            sheet.getCell(`A${rowIndex}`).style = {
                ...sheet.getCell(`A${rowIndex}`).style,
                border: { bottom: { style: 'double' } },
                //fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC0C0C0' } }
            };
            sheet.getCell(`B${rowIndex}`).style = {
                ...sheet.getCell(`B${rowIndex}`).style,
                border: { bottom: { style: 'double' } },
                //fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC0C0C0' } }
            };
        }

        rowIndex++;

        console.log(`Adicionados dados do auditor ${auditor} com sucesso.`);
    });

    // Adiciona a soma total no final
    const totalGeral = Object.values(totalPorAuditor).reduce((acc, curr) => acc + curr, 0);
    sheet.getCell(`A${rowIndex}`).value = 'Total Geral';
    sheet.getCell(`B${rowIndex}`).value = converterParaHoraMinuto(totalGeral);
    sheet.getCell(`A${rowIndex}`).style = totalStyle;
    sheet.getCell(`B${rowIndex}`).style = totalStyle;

    console.log('Soma total adicionada com sucesso.');

        // Largura das colunas automaticamente com base no conteúdo das células
        sheet.columns.forEach((column, columnIndex) => {
            let maxLength = 0;
            column.eachCell({ includeEmpty: true }, (cell) => {
                const length = cell.value ? String(cell.value).length : 0;
                if (length > maxLength) {
                    maxLength = length;
                }
            });
            // Largura mínima é definida como 10 unidades
            sheet.getColumn(columnIndex + 1).width = maxLength < 10 ? 10 : maxLength + 2; // Adiciona uma folga de 2 caracteres
        });

        console.log('Todos os registros adicionados com sucesso.');

        // formatação de alinhamento vertical e horizontal das células da planilha
        sheet.eachRow({ includeEmpty: false }, function (row) {
            row.alignment = { vertical: 'middle', horizontal: 'center' };
        });

        // altura das células individualmente para 15
        sheet.eachRow({ includeEmpty: false }, function (row) {
            for (let i = 1; i <= 13; i++) {
                row.getCell(i).height = 15;
            }
        });

        // formatação de borda, fonte e preenchimento para as células na linha (títulos das colunas)
        sheet.getRow(6).eachCell((cell) => {
            // borda e o preenchimento são aplicados apenas se houver um valor na célula
            if (cell.value) {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
                cell.font = {
                    bold: true,
                    color: { argb: 'FFCCCCCC' },
                };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF000000' },
                };
            }
        });

        // formatação de borda para todas as células nas linhas após a quarta linha
        sheet.eachRow((row, rowNumber) => { // garante que as bordas sejam aplicadas apenas às células de dados, não aos títulos das colunas
            if (rowNumber > 7) { // ignorar as primeiras linhas
                row.eachCell({ includeEmpty: false }, cell => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                });
            }
        });

        // largura das colunas automaticamente com base no conteúdo das células
        sheet.columns.forEach((column, columnIndex) => {
            let maxLength = 0;
            column.eachCell({ includeEmpty: true }, (cell) => {
                const length = cell.value ? String(cell.value).length : 0;
                if (length > maxLength) {
                    maxLength = length;
                }
            });
            // largura mínima é definida como 10 unidades
            sheet.getColumn(columnIndex + 1).width = maxLength < 10 ? 10 : maxLength + 2; // add uma folga de 2 caracteres
        });

        console.log('Formatando planilha concluída.');

        await workbook.xlsx.writeFile('Informações-Contratos.xlsx');
        console.log('Arquivo gerado com sucesso!');
    } catch (error) {
        console.error('Erro ao gerar o arquivo Excel:', error);
    }

}

module.exports = generateExcel;