/*  MAIN SCRIPT */

// TABS PART
// DOM
const tabs = document.querySelectorAll('.tab');
const sects = document.querySelectorAll('.sect--add');
const notesContainer = document.querySelector('.main-notes');
const sortOptions = document.querySelectorAll('.sort-check');
tabs.forEach((tb,indx) => {
    tb.addEventListener('click', () => {
    // GET THE CURRENT TAB
    tabs.forEach((one) => one.classList.remove('active'));
    tb.classList.add('active');
    // GET THE CURRENT SECTION
    sects.forEach((sec) => sec.classList.add('d-none'));
    sects[indx].classList.remove('d-none');
    })
});

// HEADER DROP DOWN MENU
// DOM
const dropHeaderBtn = document.getElementById('header--dropmenu-btn');
const dropHeaderMenu = document.getElementById('header--dropmenu');
// SHOW DROP HEADER MENU
dropHeaderBtn.addEventListener('click', function() {
    dropHeaderMenu.classList.toggle('active');
})
// HIDE IT WHEN WE CLICK THE WINDOW
document.addEventListener('click', (e) => {
    if(!e.target.classList.contains('head-targ')) {
        dropHeaderMenu.classList.remove('active');
    }
})
// DOM
// menu
const topMenu = document.querySelector('.top--menu');
const bottomBar = document.querySelector('.bottom-bar');
// btns
const hideTopBtn = document.getElementById('hide--top');
const hideBottomBtn = document.getElementById('hide--bottom');
// icons
const bottomIcon = document.getElementById('bottom--icon');
const topIcon = document.getElementById('top--icon');
// add functions
hideTopBtn.addEventListener('click', () => {
    topIcon.classList.toggle('d-none');
    topMenu.classList.toggle('d-none');
});
hideBottomBtn.addEventListener('click', () => {
    bottomIcon.classList.toggle('d-none');
    bottomBar.classList.toggle('d-none');
});

// LABEL TEXT AREA
const labelText = document.querySelector('.textarea');
window.onload = () => labelText.focus();
// ACTIONS
labelText.addEventListener('input', setLabel);
// CALL THE FUNCTION SET LABEL TO THE TEXTAREA
setLabel();
function setLabel() {
    // check the text content
    let content = labelText.textContent;
    let inner = labelText.innerHTML;
    if(content === '') {
        labelText.dataset.label = 'Write your ideas...';
    }else {
        labelText.dataset.label = '';
    }
    // check the inner html
    if(inner !== '') {
        labelText.dataset.label = '';
    }
    // check if there are multiple lines
    let lines = document.querySelector('.textarea div');
    if(lines && content === '') labelText.dataset.label = '';
    // check if the textarea is clearn completely 
    if(inner === '<br>') labelText.dataset.label = 'Write your ideas...';
}

// CALCULATE WORDS AND CHARACTERS
// DOM
const charEl = document.getElementById('char--count')
const wordsEl = document.getElementById('words--count')
// CALL FUNCTION
labelText.addEventListener('input', wordsAndChar);
function wordsAndChar() {
    // characters
    let regSpace = /\s/g;
    let chars = labelText.textContent.replace(regSpace, '');
    charEl.innerHTML = chars.length + ' ';
    // words
    let words = labelText.textContent.split(' ').filter((e) => e.trim() !== '');
    wordsEl.innerHTML = words.length + ' ';
}

// HOVER ICONS
// DOM
const hoverIcons = document.querySelectorAll('.scd--icon');
let mainHoverIcons = [...hoverIcons].filter((e) => !e.classList.contains('no--affect'));
addHoverLabelIcon();
function addHoverLabelIcon() {
    mainHoverIcons.forEach((icon) => {
        // add relative position
        icon.classList.add('position-relative');
        // add the main element
        icon.innerHTML += `<div class="hover--main-icon d-none">${icon.dataset.title}</div>`;
        // add the btn type
    });   
}
// ADD HOVER EFFECT
mainHoverIcons.forEach((ic) => {
    ic.addEventListener('mouseenter', () => {
        ic.lastElementChild.classList.remove('d-none');
    })
    ic.addEventListener('mouseleave', () => {
        ic.lastElementChild.classList.add('d-none');
    })
});

hoverIcons.forEach((e) => e.addEventListener('click', setLabel));

// START USING EXEC COMMAND
function addCmd(cmd, value = null){
    if(value) {
        document.execCommand(cmd,false,value);
    }else {
        document.execCommand(cmd);
    }
}

// BTN CLEAR TEXT AREA
let clearTextArea = document.getElementById('clearTextarea');
clearTextArea.addEventListener('click', () => {
    labelText.innerHTML = 'Cleared!';
    setLabel();
})

// SELECT FORM CHANGE PAGE WIDTH
const changePageWidth = document.getElementById('changePageWidth');
changePageWidth.addEventListener('change', function() {
    labelText.parentElement.style.width = this.value;
});

// INSERT AN IMAGE
// DOM
const inpGroups = document.querySelectorAll('.input--group');
const byType = document.querySelectorAll('.by-type');
const url = byType[0].lastElementChild;
const upload = byType[1].firstElementChild;
const selectForms = document.querySelectorAll('.options select');
const insertBtn = document.getElementById('insertBtn');
inpGroups.forEach((inp, indx) => {
    url.addEventListener('input', checkUrl)
    inp.addEventListener('click', () => {
        // RESET ALL
        byType[1].lastElementChild.innerHTML = `Browse An Image`;
        byType[1].firstElementChild.value = '';
        url.value = ''
        checkUrl();
        inp.firstElementChild.checked = true;
        // TOGGLE ACTIVE CLASSE
        byType.forEach((type) => type.classList.add('d-none'));
        inp.nextElementSibling.classList.remove('d-none');
        // GET SELECTED OPTION
        if(indx === 1) {
            checkFile();
            upload.addEventListener('change', getUploaded);
        }
        else if (indx === 0){
            checkUrl();
            url.addEventListener('input', checkUrl);
        }
    })
});
// VALIDATION
// CHECK IF THE URL IS NOT EMPTY
function checkUrl() {
    if(url.value.trim() !== '') {
        insertBtn.disabled = false;
    }else insertBtn.disabled = true;
}
// GET UPLOADED IMG
function getUploaded() {
    let reader = new FileReader();
    let fakeImg = document.getElementById('img--to-upload');
    reader.addEventListener('load', function() {
        byType[1].lastElementChild.innerHTML = `<p class="pe-2 line-clamp flex-grow-1">${upload.files[0].name}</p><i class="bx bx-check d-flex align-items-center justify-content-center"></i>`;
        fakeImg.dataset.src = this.result;
    });
    reader.readAsDataURL(this.files[0]);
    insertBtn.disabled = false;
}
// CHECK IF THERE IS FILES
function checkFile() {
    let cond = byType[1].lastElementChild.innerHTML.includes('</i>');
    if(cond) {
        insertBtn.disabled = false;
    }else {
        insertBtn.disabled = true;
    }
}

// MODAL DOM
const insertImgParentModal = document.getElementById('insert--parent-img');
const insertImgContentModal = document.getElementById('insert--content-img');
const insertImgBtn = document.getElementById('insert--img-btn');

// ADD CLICK EVENT TO THE INSERT BTN
insertBtn.addEventListener('click', insetImg);
function insetImg() {
    // TOOLS
    let fakeImg = document.getElementById('img--to-upload');
    let imgSrc;
    let selectedOption = [...inpGroups].filter(el => el.firstElementChild.checked)[0];
    // FIRST TYPE: URL
    if([...inpGroups].indexOf(selectedOption) === 0) {
        imgSrc = url.value;
    }
    // SECOND TYPE: UPLOAD
    else if([...inpGroups].indexOf(selectedOption) === 1) {
        imgSrc = fakeImg.dataset.src;
    }
    // GET ALIGN & WIDTH
    let align = selectForms[1].value;
    let width = selectForms[0].value;
    // CREATE THE IMG
    labelText.innerHTML += `
    <div>Write before Insert</div>
    <div class="d-flex w-100 mt-1" style="justify-content: ${align};">
    <div class="img-uploaded--container" style="width:${width};">
    <img src="${imgSrc}" class="main--img-uploaded">
    </div>
    </div>
    <div>Write after Insert!</div>
    `
    fakeImg.dataset.src = '';
    setLabel();
    checkImgErrors();
    // CLOSE MODAL
    closeInsertModalImg();
}
// CREATE A FAKE IMG
createFakeImg();
function createFakeImg() {
    let img = document.createElement('div');
    img.id = 'img--to-upload';
    document.body.appendChild(img);
}

// SHOW MODAL
insertImgBtn.addEventListener('click', () => {
    resetInsertImgModal();
    showInsertModalImg();
})

// RESET MODAL INSERT IMG
function resetInsertImgModal() {
    url.value = '';
    byType[1].firstElementChild.value = '';
    byType[1].lastElementChild.innerHTML = 'Browse An Image';
    inpGroups[0].click();
    insertBtn.disabled = true;
    selectForms.forEach((sel) => sel.selectedIndex = 0);
}

// CLOSE MODAL BTNS
const closeInsertImgModal = document.querySelectorAll('.close--insert-img');
closeInsertImgModal.forEach((cl) => {
    cl.addEventListener('click', closeInsertModalImg);
})
function closeInsertModalImg() {
    insertImgParentModal.classList.remove('active');
    insertImgContentModal.classList.remove('active');
}
function showInsertModalImg() {
    insertImgParentModal.classList.add('active');
    insertImgContentModal.classList.add('active');
}
// CHECK IF THE URL IS NOT VALID
function checkImgErrors() {
    let imgUploaded = [...document.querySelectorAll('.main--img-uploaded')];
    if(imgUploaded.length) {
        imgUploaded.forEach((img) => {
            img.addEventListener('error', () => {
                img.parentElement.innerHTML = '<span style="color: red;">Unvalid URL</span>';
            });
        })
    }
}

/* 
    INSERT LINK SECTION
*/

const insertLinkBtn = document.querySelector('[data-title="Link"]');
insertLinkBtn.addEventListener('click', () => {
    // CHECK IF THE USER SELECT SOME TEXT
    let txtSelected = window.getSelection().toString();
    if(txtSelected.length) {
        let urlLink = prompt('Enter the URL');
        if(urlLink.trim()) {
         addCmd("createlink",urlLink)  
         let links = [...document.querySelectorAll('.textarea a')];
         // FIX LINK INPUT
         links.forEach((link) => {
             link.setAttribute('target','_blank')
             link.addEventListener('mouseenter',removeContentEdit);
             link.addEventListener('mouseleave',showContentEdit);
         });
        }
    }
})

function removeContentEdit() {
    labelText.setAttribute('contenteditable',false);
}
function showContentEdit() {
    labelText.setAttribute('contenteditable',true);
}

/* 
    UNLINK SECTION
*/

const unlink = document.querySelector('[data-title="Unlink"]');
unlink.addEventListener('click', () => {
    addCmd('unlink');
});


/* 
    INSERT CODE SECTION
*/

// DOM
const insertCodeIcon = document.querySelector('[data-title="Code"]');
const insertCodeBtn = document.getElementById('insertCode');
const insertCodeParentModal = document.querySelector('.insert--code-parent');
const insertCodeContentModal = document.querySelector('.insert--code-content');
const closeInsertCodeModal = document.querySelectorAll('.close--insert-code');
const codeTextArea = document.querySelector('.code--textarea')

// SHOW MODAL
insertCodeIcon.addEventListener('click', () => {
    showInsertModalCode();
    insertCodeBtn.disabled = true;
    codeTextArea.value = '';
});
// HIDE MODAL
closeInsertCodeModal.forEach((cl) => {
    cl.addEventListener('click', hideInsertModalCode);
});
// GET THE TEXT AREA
codeTextArea.addEventListener('input', function() {
    if(this.value.trim() !== '') {
        insertCodeBtn.disabled = false;
    }else {
        insertCodeBtn.disabled = true;
    }
})
// FUNCTIONS
function showInsertModalCode() {
    insertCodeParentModal.classList.add('active');
    insertCodeContentModal.classList.add('active');
}
function hideInsertModalCode() {
    insertCodeParentModal.classList.remove('active');
    insertCodeContentModal.classList.remove('active');
}
// CREATE THE CODE SECTION
insertCodeBtn.addEventListener('click', uploadCode);
function uploadCode() {
    // UPLOAD THE CODE
    labelText.innerHTML += '<div>Write Before Insert</div>'
    let pre = document.createElement('pre');
    let code = document.createElement('code');
    let txtcode = document.createTextNode(codeTextArea.value);
    code.appendChild(txtcode);
    pre.appendChild(code);
    labelText.appendChild(pre);
    setLabel();
    hideInsertModalCode();
    // HIGHLIGHT CODE
    document.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
    });
    labelText.innerHTML += '<div>Write after Insert!</div>';
    wordsAndChar();
    // REMOVE THE CONTENT EDIT FROM THE CODE
    let codes = document.querySelectorAll('.textarea pre');
    codes.forEach((pre) => {
    pre.addEventListener('mouseenter', removeContentEdit);
    pre.addEventListener('mouseleave', showContentEdit);
    });
}

/* 
    INSERT TABLE SECTION
*/

const insertTableIcon = document.querySelector('[data-title="Table"]');
const insertTableParent = document.querySelector('.insert--table-parent');
const insertTableContent = document.getElementById('formTable');
const closeInsertTable = document.querySelectorAll('.close--insert-table');
const insertTableBtn = document.getElementById('insertTable');
const rows = document.getElementById('numRows');
const cols = document.getElementById('numCols');
const tableThemes = document.querySelectorAll('[data-table]');
// SHOW MODAL & HIDE
function showInsertModalTable() {
    insertTableParent.classList.add('active');
    insertTableContent.reset();
    insertTableContent.classList.add('active');
}
function hideInsertModalTable() {
    insertTableParent.classList.remove('active');
    insertTableContent.classList.remove('active');
}
closeInsertTable.forEach((cl) => cl.addEventListener('click', hideInsertModalTable));
insertTableIcon.addEventListener('click', showInsertModalTable);

// START UPLOADING TABLE

insertTableContent.addEventListener('submit', function(e) {
    e.preventDefault();
    uploadTable();
    hideInsertModalTable();
});
// GET THE MAIN NUMBER OF COLS AND ROWS
function getNumRows() {
    let val = rows.value.trim();
    return +val;
}
function getNumCols() {
    let val = cols.value.trim();
    return +val;
}
// UPLOAD TABLE
function uploadTable() {
    let result = getRowsAndCols();
    labelText.innerHTML += `<div class='table-responsive'><table class="table table-${getTableTheme()}">${result}<table></div>`;
    setLabel();
}
// GET COLS AND ROWS ELEMENTS
function getRowsAndCols() {
    let nRows = getNumRows();
    let nCols = getNumCols();
    let result = `<tr>${'<td>cell</td>'.repeat(nCols)}</tr>`.repeat(nRows);
    return result;
}
// GET TABLE THEME
function getTableTheme() {
    let selectedTheme = [...tableThemes].filter((tb) => tb.checked)[0];
    return selectedTheme.dataset.table;
}


/* 
    STORE DATA SECTION
*/

const saveBtn = document.querySelector('[data-title="Save"]');
saveBtn.addEventListener('click', () => {
    let arr = getLocal();
    let reg = labelText.textContent.replace(/\s/g, '');
    let label;
    if(reg || labelText.innerHTML.includes('img')) {
        let title = prompt('Choose a title to your note');
        if(title) {
            // Get note title
            label = title.trim() ? title.trim() : 'No title';
            // Get section width
            let secWid = labelText.parentElement.style.width;
            // Get the main content
            let mainContent = labelText.innerHTML;
            // Get current time
            let time = getNoteDate();
            // Create the main object
            let obj = {
                title: label,
                content: mainContent,
                date: time,
                dateNum: new Date().getTime(),
                description: getDescription(),
                sectWidth: labelText.parentElement.style.width
            }
            arr.push(obj);
            // Update local storage
            localStorage.setItem('notes', JSON.stringify(arr));
            // other updates
            hideAddNote();
            updateNotes();
            isNotesEmpty();
            getNumNotes();
            localStorage.setItem('sort-index',0);
            indexTarget();
            addeventPreview();
        };
    }
})
function getLocal() {
    let loc = localStorage.getItem('notes');
    return loc ? JSON.parse(loc) : [];
};
// CORRECT SECONDS AND MINUTES
function correctTime(type) {
    return type < 10 ? '0'+type : type;
}
// GET DATE AS A STRING EX: 10 Aug,200 at 20:00 PM
function getNoteDate() {
    let d = new Date();
    // DATE
    let dateArr = d.toDateString().split(' ').slice(1);
    let dateStr = `${dateArr[1]} ${dateArr[0]}, ${dateArr[2]}`;
    // TIME
    let h = correctTime(d.getHours());
    let m = correctTime(d.getMinutes());
    // PM & AM
    let pmAm = h > 12 ? 'PM' : 'AM';
    return `${dateStr} at ${h}:${m} ${pmAm}`;
}
function getDescription() {
    let regular = /(cell)|(cleared!)|(write before insert)|(write after insert)|(unvalid url)/gi;
    let txtCont = labelText.textContent.replace(regular,'').replace(/↵/ig,' ');
    if(txtCont.trim().length === 0) txtCont = 'No description to show.';
    return txtCont.length > 100 ? txtCont.substring(0,100) : txtCont.trim();
}

// START UPLOAD TO THE MAIN PAGE SECTION NOTES
const sectionAddNote = document.querySelector('.add--note-section');
const newNoteBtn = document.getElementById('addNewNote');
const clearAllBtn = document.getElementById('clearAllNotes');
const closeAddNote = document.querySelector('[data-title="Close"]');
const emptyNotes = document.querySelector('.notes--empty');
const searchNotes = document.getElementById('search--notes');
const sortNotes = document.getElementById('sort--notes');
// ADD NEW NOTE
newNoteBtn.addEventListener('click', () => {
    labelText.innerHTML = '';
    showAddNote();
    setLabel();
    labelText.focus();
    resetAddNoteSection();
})
// CLOSE ADD NOTE SECTION
closeAddNote.addEventListener('click', () => {
    if(labelText.innerHTML.length && labelText.textContent.trim().length) {
        let checkClose = confirm('Do you want really to close this section ?');
        if(checkClose) hideAddNote();
    }else hideAddNote();
})
// SHOW ADD NOTE SECTION
function showAddNote() {
    sectionAddNote.classList.remove('d-none');
}
// HIDE ADD NOTE SECTION
function hideAddNote() {
    sectionAddNote.classList.add('d-none');
}
function resetAddNoteSection() {
    tabs[0].click();
    changePageWidth.selectedIndex = 6;
    labelText.parentElement.style.width = '100%';
    pickr.setColor('#16181b');
    pickre.setColor('#fff');
}
updateNotes();
function updateNotes() {
    let arr = getLocal();
    let inner = '';
    arr.forEach((e,i) => {
        inner += `
        <div class="note mb-3 p-md-3 p-3 bg-white rounded-3">
        <div class="note--up mb-md-2 mb-1 d-flex align-items-center justify-content-between">
          <h5 class="note--title line-clamp pe-5">${e.title}</h5>
          <div class="main--icon position-relative" onclick="deleteNote(${i})">
            <i class="bx bx-x"></i>
          </div>
        </div>
        <div class="note--content">
          <p class="note--description mb-2 line-clamp pe-md-4">${e.description}</p>
          <p class="note--date">${e.date}</p>
        </div>
      </div>
        `
    });
    notesContainer.innerHTML = inner;
}
// DELETE SPECIFIC NOTE
function deleteNote(idx) {
    let arr = getLocal();
    let validation = confirm('Do you want really to delete this note ?');
    if(validation) {
        arr.splice(idx, 1);
        localStorage.setItem('notes', JSON.stringify(arr));
        updateNotes();
        isNotesEmpty();
        getNumNotes();
    };
}
// CHECK IF THE NOTES CONTAINER IS EMPTY
isNotesEmpty();
function isNotesEmpty() {
    let arr = getLocal();
    if(arr.length === 0) {
        emptyNotes.classList.remove('d-none');
        clearAllBtn.disabled = true;
        searchNotes.disabled = true;
        sortNotes.disabled = true;
        localStorage.setItem('sort-index', 0);
        indexTarget();
    }else {
        emptyNotes.classList.add('d-none');
        clearAllBtn.disabled = false;
        searchNotes.disabled = false;
        sortNotes.disabled = false;
    }
}
// GET THE NUM OF NOTES
const countNotesEl = document.getElementById('countNotes');
getNumNotes();
function getNumNotes() {
    let arr = getLocal();
    countNotesEl.innerHTML = arr.length;
}
// CLEAR ALL NOTES
clearAllBtn.addEventListener('click', () => {
    let validation = confirm('Once you delete all your notes, there\'s no going back. Do you want really to clear all your notes ?');
    if(validation) {
        localStorage.removeItem('notes');
        updateNotes();
        isNotesEmpty();
        getNumNotes();
    }
})
// SEARCH FILTER
searchNotes.addEventListener('input', filterNotes);
function filterNotes() {
    const notes = [...document.querySelectorAll('.main-notes .note')];
    notes.forEach((one) => {
        let title = one.firstElementChild.firstElementChild.textContent.trim().toLowerCase();
        let val = this.value.trim().toLowerCase();
        if(title.startsWith(val)) {
            one.classList.remove('d-none');
        }else {
            one.classList.add('d-none');
        }
    });
}
// SORT SECTION
// SHOW HIDE DROP DOWN
const sortDrop = document.getElementById('sort--drop');
sortNotes.addEventListener('click', function() {
    sortDrop.classList.toggle('active');
});
window.addEventListener('click', (e) => {
    if(!e.target.classList.contains('sort-targ')) {
        sortDrop.classList.remove('active');
    }
});
// START SORTING ELEMENTS
sortOptions.forEach((one, indx) => {
    one.parentElement.addEventListener('click', () => {
        sortOptions.forEach((el) => el.classList.add('v-hidded'));
        one.classList.remove('v-hidded');
        localStorage.setItem('sort-index',indx);
        // ALPHABITIC SORT
        if(indx === 2) {
            filterAlpha();
            updateNotes();
        }
        // NEWEST SORT
        else if(indx === 0) {
            filterNewest();
            updateNotes();
        }
        else if(indx === 1) {
            filterOldest();
            updateNotes();
        }
    })
});

function filterAlpha() {
    let arr = getLocal();
    let arrSorted = arr.sort((a,b) => {
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        else return 0;
    })
    localStorage.setItem('notes', JSON.stringify(arrSorted));
}
indexTarget();
function indexTarget() {
    let index = localStorage.getItem('sort-index');
    sortOptions[index].parentElement.click();
}
function filterOldest() {
    let arr = getLocal();
    let arrSorted = arr.sort((a,b) => a.dateNum > b.dateNum);
    localStorage.setItem('notes', JSON.stringify(arrSorted));
}
function filterNewest() {
    let arr = getLocal();
    let arrSorted = arr.sort((a,b) => a.dateNum < b.dateNum);
    localStorage.setItem('notes', JSON.stringify(arrSorted));
}

// START WITH PREVIEW
addeventPreview();
const closePreview = document.querySelector('.close--preview');
function addeventPreview() {
    // IMPORTANT DOM
    let myNotes = [...document.querySelectorAll('.main-notes .note')];
    const mainContentPreview = document.querySelector('.main--content-preview');
    const preview = document.getElementById('preview');
    // SHOW PREVIEW WITH TITLE
    myNotes.forEach((one, indx) => {
        // SHOW PREVIEW
        one.firstElementChild.firstElementChild.addEventListener('click', () => {
            let elem = getLocal()[indx];
            showPreview();
            preview.firstElementChild.firstElementChild.innerHTML = elem.title;
            // SHOW CONTENT
            mainContentPreview.parentElement.style.width = elem.sectWidth;
            mainContentPreview.innerHTML = elem.content;
        })
    })
}
closePreview.addEventListener('click', hidePreview);
function showPreview() {
    preview.classList.remove('d-none');
}
function hidePreview() {
    preview.classList.add('d-none');
}