let tabInLocalStorage = localStorage.getItem('productList')
if(!tabInLocalStorage) localStorage.setItem('productList', JSON.stringify([]))

const PRODUCT_REVIEW = {
    productList: JSON.parse(tabInLocalStorage),
    submitForm: ()=>{
        const form = document.getElementById('filed')
        if(form){
            form.addEventListener('submit', e=>{
                e.preventDefault()
                let nameField = form.querySelector('input#name').value
                let unitField = form.querySelector('input#unit').value
                let qteField = form.querySelector('input#qte').value
                if(nameField == "" || unitField == "" || qteField == "" ){
                    let erreur_msg = document.getElementById('erreur_msg')
                    erreur_msg.innerHTML = "veuillez saisir tous les champs"
                    erreur_msg.style.display = "block" 
                    // alert("veuillez saisir tous les champs") 
                }else{
                    let totalPrice = parseInt(unitField) * parseInt(qteField)
                    const productObject = {
                        name:nameField,
                        unitPrice:unitField,
                        qte: qteField,
                        totalPrice: totalPrice
                    }
                    PRODUCT_REVIEW.productList.push(productObject)
                    localStorage.setItem('productList', JSON.stringify(PRODUCT_REVIEW.productList))
                    window.open("http://127.0.0.1:5502/page2.html", '_blank')
                    location.reload();
                }

            })

        }
    },

    
    displayTotal: () => {
        const form = document.getElementById('filed')
        if (form) {
            const unitField = form.querySelector('input#unit')
            const qteField = form.querySelector('input#qte')
            const totalField = form.querySelector('input#total')
            totalField.value = 0
            const calculateTotal = () => {
                let unitValue = unitField.value
                let qteValue = qteField.value
                if(unitValue == '' && qteValue == ''){
                    totalField.value = 0 
                }else{
                    let total = parseInt(unitValue) * parseInt(qteValue)
                    totalField.value = total
                }
            }

            unitField.addEventListener('input', calculateTotal)
            qteField.addEventListener('input', calculateTotal)
        }
    },
    
    displayProductList: ()=>{
        const bodyTag = document.querySelector('tbody')
        if(bodyTag){
            let productItem = ``
            let total = 0
            if(PRODUCT_REVIEW.productList.length>0){
                PRODUCT_REVIEW.productList.forEach((item, index) => {
                    productItem += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.name}</td>
                            <td>${item.unitPrice}</td>
                            <td>${item.qte}</td>
                            <td>${item.totalPrice}</td>
                            <td>
                                <button onclick="PRODUCT_REVIEW.deleteProduct(${index})">Supprimer</button>
                                <button>Modifier</button>
                            </td>
                        </tr>
                    `
                })
                total = PRODUCT_REVIEW.productList.reduce((a, c) => a + parseInt(c.totalPrice), 0)
            }else{
                productItem = `
                    <tr>
                        <td colspan=5 style='text-align:center;'>Aucune information disponible.</td>
                    </tr>
                `
                total = 0
            }
            bodyTag.innerHTML = productItem

            document.querySelector('.total').innerHTML = `Total: ${total} XOF`
        }
    },

    deleteProduct: (index) => {
        PRODUCT_REVIEW.productList.splice(index, 1);
        localStorage.setItem('productList', JSON.stringify(PRODUCT_REVIEW.productList));
        PRODUCT_REVIEW.displayProductList();
    },
    
    editProduct: (index) => {
        const product = PRODUCT_REVIEW.productList[index];
        const editForm = document.getElementById('editForm');
        document.getElementById('editIndex').value = index;
        document.getElementById('editName').value = product.name;
        document.getElementById('editUnit').value = product.unitPrice;
        document.getElementById('editQte').value = product.qte;
        editForm.style.display = 'block';

        editForm.addEventListener('submit', e => {
            e.preventDefault();
            const updatedProduct = {
                name: document.getElementById('editName').value,
                unitPrice: document.getElementById('editUnit').value,
                qte: document.getElementById('editQte').value,
                totalPrice: parseInt(document.getElementById('editUnit').value) * parseInt(document.getElementById('editQte').value)
            };
            PRODUCT_REVIEW.productList[index] = updatedProduct;
            localStorage.setItem('productList', JSON.stringify(PRODUCT_REVIEW.productList));
            PRODUCT_REVIEW.displayProductList();
            editForm.style.display = 'none';
        });
    }

    modifyProduct : (index) =>{
        const form = document.getElementById('modify-filed');
        if(form){
            form.addEventListener('submit', event =>{
                event.preventDefault();
                let modifyProductName = form.querySelector('input#modify-name').value;
                let modifyProductPrice = form.querySelector('input#modify-price').value;
                let modifyProductQte = form.querySelector('input#modify-qte').value;
                let modifyProductTotalePrice = parseInt(modifyProductPrice) * parseInt( modifyProductQte);
                
                const productsModify = {
                    modifyName: modifyProductName,
                    modifyPrice: modifyProductPrice,
                    modifyQte :  modifyProductQte,
                    totalPrice : m

                }
            })
        }
    },
}
const url = window.location
if(url.pathname==='/page1.html'){
    PRODUCT_REVIEW.submitForm();
    PRODUCT_REVIEW.displayTotal()
}else if(url.pathname==='/page2.html'){
    PRODUCT_REVIEW.displayProductList()
}
