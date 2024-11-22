function generateDate () {
    
}
// что такое бандл ?
// что это за функция ? что такое requestAnimationFrame
const checkRequestAnimationDiff = () => {
    let prev;
    function call() {
        requestAnimationFrame((timestamp) => {
            if (prev) {
                console.log(timestamp - prev); // Должно быть в районе 16.6 мс, при 60FPS
            }
            prev = timestamp;
            call();
        });
    }
    call();
    }
    // checkRequestAnimationDiff();


  //  при Critical render path мы сначала получаем HTML дальше идет JS только потом css ? 

 // 1.1) Разнести блокирующие ресурсы по страницам. Как js, так и css. Хранить реиспользуемый между страницами код либо в отдельных бандлах, либо в отдельных небольших модулях.

