import { valuesCategory } from '../scripts/valuesData.js';
import { handleDelete } from '../pages/scripts/index.js';

export const render = (arrayValues) => {
    const ulListValues = document.querySelector('.list__values');
    ulListValues.innerHTML = '';

    arrayValues.forEach((value) => {
        const card = createCard(value);
        ulListValues.appendChild(card);
    });

    verifyEmpty();
    mouseOverDelete();
    sumValues(arrayValues);
    handleDelete(arrayValues);
};

const createCard = ({id, value, categoryID}) => {

    const card = document.createElement('li');
    const valueTagP = document.createElement('p');
    const divTag = document.createElement('div');
    const entryTagP = document.createElement('p');
    const figureTag = document.createElement('figure');
    const deleteTagImg = document.createElement('img');

    entryTagP.classList = 'button__greylow button-type__category';
    deleteTagImg.classList.add('img__trash--off');
    figureTag.classList.add('delete__value');

    deleteTagImg.src = './src/assets/trash-icon-off.svg';
    deleteTagImg.alt = 'delete image input value';
    deleteTagImg.dataset.deleteId = id;

    valueTagP.innerText = `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
    entryTagP.innerText = valuesCategory[categoryID];
    entryTagP.dataset.entryId = categoryID;

    figureTag.appendChild(deleteTagImg);
    divTag.append(entryTagP, figureTag);
    card.append(valueTagP, divTag);

    return card;
};

const sumValues = (arrayList) => {
    const valueStatus = document.querySelector('.total__amount');
    
    const totalSum = arrayList.reduce((acc, actual) => {
        return acc + Number(actual.value);
    }, 0);

    valueStatus.innerText = totalSum.toFixed(2).replace('.', ',');
};

const verifyEmpty = () => {
    const list = document.querySelector('.list__values');
    const listEmpty = document.querySelector('.list__empty');

    if (list.innerHTML == '') {
        listEmpty.style.display = "flex";
    } else {
        listEmpty.style.display = "none";
    };
};

const mouseOverDelete = () => {
    const buttonDelete = document.querySelectorAll('.delete__value > img');

    buttonDelete.forEach((button) => {
        button.addEventListener('mouseover', (event) => {
            const classImgOn = event.target.setAttribute('class', 'img__trash--on');
            const srcImgOn = event.target.setAttribute('src', './src/assets/trash-icon-on.svg');
        });

        button.addEventListener('mouseleave', (event) => {
            const classImgOff = event.target.setAttribute('class', 'img__trash--off');
            const srcImgOff = event.target.setAttribute('src', './src/assets/trash-icon-off.svg');
        });
    });
};

export const searchCategory = (array, searchElement) => {

    const findCategory = array.filter((category) => {
        if (category.categoryID === searchElement) {
            return category;
        };
    });

    return findCategory;
};