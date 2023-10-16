var table = document.getElementById("customproducttable");
if (table != null) {
    var rowsPerPage = 2;
    var rowCount = 1;
    rowCount = table.rows.length;
    var tableHead = table.rows[0].firstElementChild.tagName === "tr";
    var tr = [];
    var i, ii, j = (tableHead) ? 1 : 0;
    var th = (tableHead ? table.rows[(0)].outerHTML : "");
    var pageCount = Math.ceil(table.rows.length / rowsPerPage);
    if (pageCount > 1) {
        for (i = j, ii = 0; i < rowCount; i++, ii++) {
            tr[ii] = table.rows[i].outerHTML;
        }
        table.insertAdjacentHTML("afterend", "<br><div id='buttons'></div>");
        sort(1);
    }

    function sort(page) {
        var rows = th,
            s = ((rowsPerPage * page) - rowsPerPage);
        for (i = s; i < (s + rowsPerPage) && i < tr.length; i++) {
            rows += tr[i];
            table.innerHTML = rows;
        }
        document.getElementById("buttons").innerHTML = prevButtons(page);
        document.getElementById("buttons").innerHTML += nextButtons(pageCount, page);
    }

    function prevButtons(current) {
        var prevButton = (current == 1) ? "disabled" : "";
        buttons = "<input type='button' class='btn btn-secondary' value='Previous'";
        buttons += "' onclick='sort(" + (current - 1) + ")' " + prevButton + ">";
        return buttons;
    }

    function nextButtons(pageCount, current) {
        var nextButton = (current == pageCount) ? "disabled" : "";
        buttons = "<input type='button' class='btn btn-secondary' value='Next'";
        // for (i = 1; i <= pageCount; i++) {
        //     buttons += i;
        // }
        buttons += "' onclick='sort(" + (current + 1) + ")' " + nextButton + ">";
        return buttons;
    }
}