const n = 10;
const matrixArray = [];

function createMatrix(n) {
    let block = (n * n) + 1;
    for (let iterator = 1; iterator <= n; iterator++) {
        let rows = [];
        if (iterator % 2 === 0) {
            block = block - n;
            let value = block;
            for (let row = 1; row <= n; row++) {
                rows.push(value);
                value++;
            }
        } else {
            for (let row = 1; row <= n; row++) {
                block = block - 1;
                rows.push(block);
            }
        }
        matrixArray.push(rows)
    }
    return matrixArray;
}


function createBoard() {
    const matrixArray = createMatrix(n);
    const board = document.querySelector('.main-board')
    let str = "";
    matrixArray.map(row => {
        str += `
            <div class="row">`
        row.map(block => {
            value = block;
            str += `
                    <div 
                      class="block ${block===1?"active": block===100?"active":''}" id="block-${block}" data-value=${block}>
                      ${block===1?"Start": block===100?"Home":value}
                    </div>
                `
        })
        str += `</div>`
    })
    board.innerHTML = str;
}