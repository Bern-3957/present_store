let sortSelect = function () {
    let sortSelectHeader = document.querySelectorAll('.sort_select_header');
    let sortSelectItem = document.querySelectorAll('.sort_select_item')
    let sortStrelka = document.querySelector('.sort_select_icon')
    let sortSelect = document.querySelector('.sort_select')
    let sortCount = 10

    sortSelectHeader.forEach(item => {
        item.addEventListener('click', selectToggle)
    })
    sortSelectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
    });

    function selectToggle() {
        sortSelect.classList.toggle('is-active');
        sortCount += 1
        if (sortCount % 2 === 0) {
            sortStrelka.style.transform = "rotate(0deg)"
        } else {
            sortStrelka.style.transform = "rotate(90deg)"
        }
    }

    function selectChoose() {
        let text = this.innerText,
            sSelect = this.closest('.sort_select'),
            currentText = sSelect.querySelector('.sort_select_current');
        currentText.innerText = text;

        sortSelect.classList.remove('is-active') // Используем sortSelect вместо select
        sortStrelka.style.transform = "rotate(0deg)"
    }
}
sortSelect()

// Селект категорий в фильтре
let filterSelect = function () {
    let filterStrelka = document.querySelector('.select_icon')
    let selectItem = document.querySelectorAll('.select_item')
    let select_main = document.querySelector('.select')
    let count = 10

    filterStrelka.onclick = function () {
        select_main.classList.toggle('is-active')

        count += 1
        if (count % 2 === 0) {
            filterStrelka.style.transform = "rotate(0deg)"
        } else {
            filterStrelka.style.transform = "rotate(90deg)"
        }
    }
}
filterSelect()

// Слайдер в меню
// let offset = 0; // Смещение от левлого края
// const sliderLine = document.querySelector('.upheader_slider_line');
//
// document.querySelector('.upheader_slider_next').addEventListener('click', function (){
//    offset += 156;
//    if (offset > 156){
//        offset = 0;
//    }
//    sliderLine.style.left = -offset + 'px';
// });
//
// document.querySelector('.upheader_slider_previous').addEventListener('click', function (){
//    offset -= 156;
//    if (offset < 0){
//        offset = 156;
//    }
//    sliderLine.style.left = -offset + 'px';
// });

// Большой слайдер в первой странице index
// let mainIndexSlider = {
//     slideIndex: 1,
//
//     pluslides: function (n) {
//     this.showSlides(this.slideIndex += n);
//     },
//     currentslide: function(n){
//         this.showSlides(this.slideIndex = n);
//     },
//
//     // Остальные функции оставьте без изменений
//
//     // Ваши функции здесь...
//
//     // И внесите изменения в showSlides, чтобы она использовала this.slideIndex:
//
//     showSlides: function (n) {
//     let i;
//     let slides = document.getElementsByClassName("myslides");
//     let dot = document.getElementsByClassName("dot");
//
//     if (n > slides.length) {
//       this.slideIndex = 1;
//     }
//     if (n < 1) {
//       this.slideIndex = slides.length;
//     }
//
//     for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//     }
//
//     for (i = 0; i < dot.length; i++) {
//       dot[i].className = dot[i].className.replace("active", "");
//     }
//     slides[this.slideIndex - 1].style.display = "block";
//     dot[this.slideIndex - 1].className += " active";
//     }
// }
// mainIndexSlider.pluslides(0)
//
//
// let ProductsSlider = function (){
//     let offsetproducts = 0; // Смещение от левлого края
//     const sliderLineproducts = document.querySelector('.products_line');
//
//     document.querySelector('.products_right_arrow').addEventListener('click', function (){
//        offsetproducts += 310;
//        if (offsetproducts > 620){
//            offsetproducts = 0;
//        }
//        sliderLineproducts.style.left = -offsetproducts + 'px';
//     });
//
//     document.querySelector('.products_left_arrow').addEventListener('click', function (){
//        offsetproducts -= 310;
//        if (offsetproducts < 0){
//            offsetproducts = 510;
//        }
//        sliderLineproducts.style.left = offsetproducts + 'px';
//     });
// }
//
// ProductsSlider()

// return checkboxesChecked
// function getCheckedCheckBoxes() {
//     let checkbox = document.getElementsByClassName('pr_catalog_filter_checkbox')
//     let checkboxesChecked = []
//     for (let index = 0; index < checkbox.length; index++) {
//         if (checkbox[index].checked) {
//             checkboxesChecked.push(checkbox[index].value); // положим в массив выбранный
//             console.log(checkbox[index].value); // делайте что нужно - это для наглядности
//         }
//     }
//     return checkboxesChecked
// }

// let checkboxes = document.querySelectorAll(".pr_catalog_filter_checkbox");
//
// function handleCheckboxChange() {
//     let selectedValues = [];
//
//     checkboxes.forEach(function (checkbox) {
//         if (checkbox.checked) {
//             selectedValues.push(checkbox.id);
//         }
//     });
//
//     console.log("Выбранные чекбоксы:", selectedValues);
// }
//
// checkboxes.forEach(function (checkbox) {
//     checkbox.addEventListener("change", handleCheckboxChange);
// });

// Фильтрация товаров при помощи ajax

document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.pr_catalog_filter_checkbox');
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            // Получите список выбранных чекбоксов
            const selectedCheckboxes = Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.id);
            console.log(selectedCheckboxes)

            // Отправьте запрос на сервер Django
            fetch('/products/catalog/products_catalog/filter_products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': csrfToken, // Подставьте ваш CSRF-токен здесь
                },
                body: new URLSearchParams({
                    'selected_checkboxes[]': selectedCheckboxes,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    // Обработайте полученные данные (например, обновите отображение товаров)
                    console.log(data.products);
                    listElement = document.getElementById('products_line-for_catalog')
                    listElement.innerHTML = ''
                    for (let item=0; item<data.products.length; item++){
                        listElement.insertAdjacentHTML('beforeend',
                            `<div class="products_item products_item-for_catalog">
                                    <img src="{% static 'products/img/products_slider/Rectangle 21.png" %}' alt="1" class="products_item_img">
                                    <div class="products_item_info">
                                        <div class="products_item_info_art">арт. 1234556</div>
                                        <div class="products_item_info_title">${data.products[item].title}</div>
                                        <div class="products_item_info_price">${data.products[item].price} ₽</div>
                                        <div class="products_item_info_quantity">
                                            <a href="#" class="products_item_info_quantity_add_btn"><img src='{% static "products/icons/products/+ (1).svg" %}' alt="1"></a>
                                            <div class="products_item_info_quantity_number">1</div>
                                            <a href="#" class="products_item_info_quantity_subtract_btn"><img src='{% static "products/icons/products/+.svg" %}' alt=""></a>
                                        </div>
                                        <a href="#" class="products_item_info_add_to_basket_btn">В корзину</a>
                                    </div>
                                </div>
                            `)
                    }
                })
                .catch(error => {
                    console.error('Ошибка при отправке запроса:', error);
                });
        });
    });
});


// // Селект товаров
// let sortSelect = function (){
//     let sortSelectHeader = document.querySelectorAll('.sort_select_header');
//     let sortSelectItem = document.querySelectorAll('.sort_select_item')
//     let sortStrelka = document.querySelector('.sort_select_icon')
//     let sortSelect = document.querySelector('.sort_select')
//     let sortCount = 10
//
//     sortSelectHeader.forEach(item=>{
//         item.addEventListener('click', selectToggle)
//     })
//     sortSelectItem.forEach(item=>{
//         item.addEventListener('click', selectChoose)
//
//     });
//
//     function selectToggle(){
//         sortSelect.classList.toggle('is-active');
//         sortCount +=1
//         if (sortCount % 2 === 0){
//             sortStrelka.style.transform = "rotate(0deg)"
//         } else {
//             sortStrelka.style.transform = "rotate(90deg)"
//         }
//
//     }
//     function selectChoose(){
//         let text = this.innerText,
//             sSelect = this.closest('.sort_select'),
//             currentText = sSelect.querySelector('.sort_select_current');
//         currentText.innerText = text;
//
//         select.classList.remove('is-active')
//         sortStrelka.style.transform = "rotate(0deg)"
//     }
// }
// sortSelect()
//
// // Селект категориий в фильрте
// let filterSelect = function (){
//     let filterStrelka = document.querySelector('.select_icon')
//     let selectItem = document.querySelectorAll('.select_item')
//     let select_main = document.querySelector('.select')
//     let count = 10
//
//     filterStrelka.onclick = function (){
//         select_main.classList.toggle('is-active')
//
//         count +=1
//         if (count % 2 === 0){
//             filterStrelka.style.transform = "rotate(0deg)"
//         } else {
//             filterStrelka.style.transform = "rotate(90deg)"
//         }
//     }
// }
// filterSelect()
// Селект товаров






