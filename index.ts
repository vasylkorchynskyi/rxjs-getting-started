import {Observable, of, from, concat, fromEvent} from "rxjs";
import { allBooks, allReaders } from "./data";
import { ajax } from "rxjs/ajax";

// let allBooksObservable$ = new Observable(subscriber => {
//
// 	if(document.title !== "RxBookTracker") {
// 		subscriber.error("Incorrect page title");
// 	}
//
// 	for (let book of allBooks) {
// 		subscriber.next(book)
// 	}
//
// 	setTimeout(() => {
// 		subscriber.complete()
// 	}, 2000)
//
// 	return () => console.log("Perform it!", "allBooksObservable$")
// })
//
// allBooksObservable$.subscribe((book: any) => console.log(book.title))

// let source1$ = of("hello", 10, true, allReaders[0].name);
// let source2$ = from(allBooks);

let button = document.querySelector("#readerButton");

fromEvent(button, "click")
	.subscribe(event => {
		ajax("/api/readers")
			.subscribe(ajaxResponse => {

				const readers = ajaxResponse.response;
				const readersList = document.querySelector("#readers");

				for(let reader of readers) {
					const element = document.createElement("div");
					element.innerHTML = `<p>${reader.name}</p>`

					readersList.appendChild(element);
				}
			})
	})

// fromEvent(button, "click")
// 	.subscribe(event => {
// 		console.log(event)
//
// 		const readersList = document.querySelector("#readers");
//
// 		for(let reader of allReaders) {
// 			const element = document.createElement("div");
// 			element.innerHTML = `<p>${reader.name}</p>`
//
// 			readersList.appendChild(element);
// 		}
// 	})


