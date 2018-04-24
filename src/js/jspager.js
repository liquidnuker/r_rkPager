import Pager from "./pager.js";
import {pageBtns} from "./pagebtns.js";

export default function JsPager(opts) {
  this.data = opts.data;
  this.itemHolder = opts.itemHolder;
  this.currentPageHolder = opts.currentPageHolder;
  this.totalPageHolder = opts.totalPageHolder;
  this.pageBtnHolder = opts.pageBtnHolder;

  this.pageSelector = opts.pageSelector;
  this.perPageSelector = opts.perPageSelector;
  this.pageJumper = opts.pageJumper;
  this.pageJumpBtn = opts.pageJumpBtn;

  this.pageBtnClass = opts.pageBtnClass;
  this.pageBtnActiveClass = opts.pageBtnActiveClass;

  this.btn_first = opts.btn_first;
  this.btn_prev = opts.btn_prev;
  this.btn_next = opts.btn_next;
  this.btn_last = opts.btn_last;

  this.perPage = 10;
  this.perPageItems = [10, 20, 50, 100];
}

JsPager.prototype = {
  init: function () {
    this.activatePager(this.perPage);

    if (this.perPageSelector) {
      this.setPerPageDropdown();
    }

    this.addEvents();
  },
  activatePager: function () {
    this.pg = null;
    this.pg = new Pager({
      perPage: this.perPage,
      data: this.data
    });

    this.setPageBtns();
    this.showItems(1);
  },
  addEvents: function () {
    if (this.btn_first) {
      document.getElementById(this.btn_first).addEventListener("click", () => {
        this.showItems(1);
      });
    }

    if (this.btn_last) {
      document.getElementById(this.btn_last).addEventListener("click", () => {
        this.showItems(this.pg.getTotalPages());
      });
    }

    document.getElementById(this.btn_prev).addEventListener("click", () => {
      this.flip();
    });

    document.getElementById(this.btn_next).addEventListener("click", () => {
      this.flip("next");
    });

    document.getElementById(this.pageSelector).addEventListener("change", (event) => {
      this.showItems(Number(event.target.value));
    });


    document.getElementById(this.perPageSelector).addEventListener("change", (event) => {
      this.changePerPage(event.target.value);
    });


    if (this.pageJumpBtn && this.pageJumper) {
      document.getElementById(this.pageJumpBtn).addEventListener("click", () => {
        this.pageJump();
      });

      document.getElementById(this.pageJumper).addEventListener("keypress", (e) => {
        if (e.keyCode === 32 || e.keyCode === 13) {
          this.pageJump();
        }
      });
    }
  },
  showItems(num) {
    // total pages
    if (this.totalPageHolder) {
      document.getElementById(this.totalPageHolder).textContent = `of ${this.pg.getTotalPages()}`;
    }

    let itemHolder = document.getElementById(this.itemHolder);
    itemHolder.innerHTML = "";
    itemHolder.setAttribute("aria-setsize", this.data.length);

    this.pg.page(num).forEach(function (i, index) {
      let el2 = document.createElement("span");
      el2.textContent = i + " ";
      el2.value = i;
      el2.setAttribute("aria-posinset", index + 1);
      itemHolder.appendChild(el2);
    });

    this.setPageSelectorDropdown(this.pg.currentPage);

    if (this.pageBtnHolder) {
      this.changePageBtns();
    }
  },
  flip(direction) {
    if (direction === "next") {
      this.showItems(this.pg.next());
    } else {
      this.showItems(this.pg.prev());
    }
  },
  pageJump() {
    let page = Number(document.getElementById(this.pageJumper).value);
    this.showItems(page);
  },
  changePerPage(perPage) {
    this.perPage = perPage;
    this.activatePager();
  },
  setPageSelectorDropdown(page) {
    let pageSelector = document.getElementById(this.pageSelector);
    pageSelector.innerHTML = "";

    let optsArr = [];
    for (let i = 0, l = this.pg.getTotalPages() + 1; i < l; i++) {
      optsArr.push({
        value: i,
        selected: false
      });
    }

    optsArr[page].selected = true;

    for (let i = 1, l = this.pg.getTotalPages() + 1; i < l; i++) {
      let el2 = document.createElement("option");
      el2.textContent = optsArr[i].value;
      el2.value = optsArr[i].value;
      el2.selected = optsArr[i].selected;
      pageSelector.appendChild(el2);
    }
  },
  setPerPageDropdown() {
    let perPageSelector = document.getElementById(this.perPageSelector);
    perPageSelector.innerHTML = "";

    this.perPageItems.forEach(function (i) {
      let el2 = document.createElement("option");
      el2.textContent = i;
      el2.value = i;
      perPageSelector.appendChild(el2);
    });
  },
  setPageBtns() {
    this.temp = [];
    // push page buttons to new array to prevent extra buttons
    for (let i = 0, l = this.pg.getTotalPages(); i < l; i++) {
      this.temp.push(pageBtns(i, l));
    }
  },
  changePageBtns() {
    let pageBtnHolder = document.getElementById(this.pageBtnHolder);
    pageBtnHolder.innerHTML = "";

    let buttonSet = this.temp[this.pg.currentPage - 1];
    let el2;
    buttonSet.forEach((i, index) => {
      el2 = document.createElement("a");

      el2.className = this.pageBtnClass;
      el2.textContent = i;
      el2.value = i;
      el2.setAttribute("tabindex", 0);
      el2.setAttribute("aria-posinset", index + 1);

      if (el2.value === this.pg.currentPage) {
        el2.className += this.pageBtnActiveClass;
        el2.setAttribute("aria-selected", true);
      }

      el2.addEventListener("click", (e) => {
        this.showItems(e.target.value);
      });

      el2.addEventListener("keypress", (e) => {
        if (e.keyCode === 32 || e.keyCode === 13) {
          this.showItems(e.target.value);
        }
      });

      pageBtnHolder.setAttribute("aria-setsize", buttonSet.length);
      pageBtnHolder.appendChild(el2);
    });
  },
};