(function () {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            { id: "Product", dataType: tableau.dataTypeEnum.string },
            { id: "Partner", dataType: tableau.dataTypeEnum.string },
            { id: "Day", dataType: tableau.dataTypeEnum.datetime },
            { id: "ProductNDC", dataType: tableau.dataTypeEnum.string },
            { id: "DMA_DOHTarget", dataType: tableau.dataTypeEnum.string },
            { id: "ProductDescription", dataType: tableau.dataTypeEnum.string },
            { id: "ProductName", dataType: tableau.dataTypeEnum.string },
            { id: "Projected_DOH_Units", dataType: tableau.dataTypeEnum.float },
            { id: "Projected_DOH_Units_Numerator", dataType: tableau.dataTypeEnum.float },
            { id: "Projected_DOH_Units_Denominator", dataType: tableau.dataTypeEnum.float },
            { id: "Projected_DOH_14_Day_Units", dataType: tableau.dataTypeEnum.float },
            { id: "Projected_DOH_14_Day_Units_Numerator", dataType: tableau.dataTypeEnum.float },
            { id: "Projected_DOH_14_Day_Units_Denominator", dataType: tableau.dataTypeEnum.float },
            { id: "Projected_DOH_7_Day_Units", dataType: tableau.dataTypeEnum.float },
            { id: "Projected_DOH_7_Day_Units_Numerator", dataType: tableau.dataTypeEnum.float },
            { id: "Projected_DOH_7_Day_Units_Denominator", dataType: tableau.dataTypeEnum.float },
            { id: "SUM_Order_ModifiedUnits", dataType: tableau.dataTypeEnum.float },
        ];

        var tableInfo = {
            id: "Abc",
            alias: "Extract",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Download the data
    myConnector.getData = function (table, doneCallback) {

        $.get("https://secure1.valuecentric.com/ValueCentric/getDatasource.cfm?r=p7NWuJweaiX1EVUbY5l6%2Bw%3D%3D&q=2&c=155").done(function (resp) {
            console.log(resp);
            // Assuming the data is in CSV-like format
            var rows = resp.split('\n'); // Split rows by newline
            var tableData = [];

            // Process each row (assuming the first row contains column headers)
            for (var i = 1; i < rows.length; i++) {
                var row = rows[i].split('\t'); // Split columns by commas
                tableData.push({
                    "Product": row[0],
                    "Partner": row[1],
                    "Day": row[2],
                    "ProductNDC": row[3],
                    "DMA_DOHTarget": row[4],
                    "ProductDescription": row[5],
                    "ProductName": row[6],
                    "Projected_DOH_Units": row[7],
                    "Projected_DOH_Units_Numerator": row[8],
                    "Projected_DOH_Units_Denominator": row[9],
                    "Projected_DOH_14_Day_Units": row[10],
                    "Projected_DOH_14_Day_Units_Numerator": row[11],
                    "Projected_DOH_14_Day_Units_Denominator": row[12],
                    "Projected_DOH_7_Day_Units": row[13],
                    "Projected_DOH_7_Day_Units_Numerator": row[14],
                    "Projected_DOH_7_Day_Units_Denominator": row[15],
                    "SUM_Order_ModifiedUnits": row[16]
                });
            }
            console.log(tableData)
            // Append the rows to Tableau
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function () {
        translateButton();
        $("#submitButton").click(function () {
            tableau.connectionName = "WDC Connection"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();

// Values attached to the tableau object are loaded asyncronously.
// Here we poll the value of locale until it is properly loaded
// and defined, then we turn off the polling and translate the text.
var translateButton = function () {
    var pollLocale = setInterval(function () {
        if (tableau.locale) {
            switch (tableau.locale) {
                case tableau.localeEnum.china:
                    $("#submitButton").text("获取地震数据");
                    break;
                case tableau.localeEnum.germany:
                    $("#submitButton").text("Erhalten Erdbebendaten!");
                    break;
                case tableau.localeEnum.brazil:
                    $("#submitButton").text("Obter Dados de Terremoto!");
                    break;
                case tableau.localeEnum.france:
                    $("#submitButton").text("Obtenir les Données de Séismes!");
                    break;
                case tableau.localeEnum.japan:
                    $("#submitButton").text("地震データの取得");
                    break;
                case tableau.localeEnum.korea:
                    $("#submitButton").text("지진 데이터 가져 오기");
                    break;
                case tableau.localeEnum.spain:
                    $("#submitButton").text("Obtener Datos de Terremotos!");
                    break;
                default:
                    $("#submitButton").text("Get Data!");
            }
            clearInterval(pollLocale);
        }
    }, 10);
};


// var cols = [
// { id: "userId", dataType: tableau.dataTypeEnum.float },
// { id: "id", dataType: tableau.dataTypeEnum.float },
// { id: "title", dataType: tableau.dataTypeEnum.string },
// { id: "completed", dataType: tableau.dataTypeEnum.bool }
// ];