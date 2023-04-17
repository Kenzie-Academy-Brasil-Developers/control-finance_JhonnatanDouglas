/* Desenvolva sua lógica aqui */
import { insertedValues } from '../../scripts/valuesData.js';
import { handleModal, closeModal } from '../../scripts/modal.js';
import { render, searchCategory } from '../../scripts/render.js';

export const handleSearchCategory = (arrayValues) => {
    const buttonAll = document.querySelectorAll('.button-value__all');
    const buttonCategory = document.querySelectorAll('.button-type__category');

    buttonAll.forEach((arrayAll) => {
        arrayAll.addEventListener('click', () => {
            render(arrayValues);
        });
    });

    buttonCategory.forEach((arrayInput) => {
        arrayInput.addEventListener('click', (event) => {
            const typeCategory = Number(event.target.dataset.entryId);
            const valuesFounded = searchCategory(arrayValues, typeCategory);

            render(valuesFounded);
        });
    });
};

export const handleNewValue = (insertedList) => {
    const modalController = document.querySelector('#modal__controller');
    const buttonSend = document.querySelector('.button-send__values');
    const amountValue = document.querySelector('#new-value__modal');
    const categoryValue = document.querySelectorAll('.button__category');

    let newValue = {};
    let categoryType = '';
    closeModal();

    categoryValue.forEach((category) => {
        category.addEventListener('click', (event) => {
            categoryType = '';
            categoryType = event.target.innerText.toLowerCase();
        });
    });
    
    buttonSend.addEventListener('click', () => {
        newValue.id = insertedList.length + 1;
        
        if (categoryType == 'entrada') {
            newValue.categoryID = 0;
        } else if (categoryType == 'saída') {
            newValue.categoryID = 1;
        };

        if (categoryType === '' || Number(amountValue.value) === 0) {
            alert(`Oops! Você precisa informar o "Valor" e o "Tipo de Valor". \n\nPor favor, tente novamente.`);
            modalController.close();
        } else {
            newValue.value = Number(amountValue.value);
            insertedList.push(newValue);
            render(insertedValues);

            newValue = {};
            amountValue.value = '';
            modalController.close();
        };
    });
};

export const handleDelete = (valueList) => {
    const buttonDelete = document.querySelectorAll('.delete__value > img');

    buttonDelete.forEach((button => {
        button.addEventListener('click', (event) => {
            const datasetButtonId = event.target.dataset.deleteId;
            const findValueIndex = valueList.findIndex((value) => value.id === Number(datasetButtonId));
            const removeValue = valueList.splice(findValueIndex, 1);

            render(valueList);
        });
    }));
};

render(insertedValues);
handleModal();
handleNewValue(insertedValues);
handleSearchCategory(insertedValues);