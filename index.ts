import {Observable, of, from, concat, fromEvent, interval} from "rxjs";
import { allBooks, allReaders } from "./data";
import { ajax } from "rxjs/ajax";

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

/// ----
/*const books$ = from(allBooks)

books$.subscribe({
	next(v) {
		console.log(v)
	},
	complete() {
		console.log("all done")
	}
})*/
/// ----
/*
const currentTime$ = new Observable(subscriber => {
	const timeString = new Date().toLocaleTimeString()
	subscriber.next(timeString);
	subscriber.complete();
})


currentTime$.subscribe({
	next: v => console.log(v)
})

setTimeout(() => {
	currentTime$.subscribe({
		next: v => console.log(v)
	})
}, 1000)

setTimeout(() => {
	currentTime$.subscribe({
		next: v => console.log(v)
	})
}, 2000)*/


const timesDiv = document.querySelector("#times");
const timesButton = document.querySelector("#timesButton");

// const timer$ = interval(1000);\

const timer$ = new Observable(subscriber => {
	let i = 0;
	let intervalID = setInterval(() => {
		subscriber.next(i++)
	}, 1000)

	return () => {
		console.log("Executing teardown code.")
		clearInterval(intervalID);
	}
})

const timerSubscription = timer$.subscribe({
	next(value) {
		timesDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br />`
	},
	complete() {
		console.log("Timer done!")
	}
})

const renderSubscription = timer$.subscribe({
	next: value => {
		console.log("[1]", value)
	}
})

const renderSubscription2 = timer$.subscribe({
	next: value => {
		console.log("[2]",value)
	}
})

timerSubscription.add(renderSubscription);
timerSubscription.add(renderSubscription2);

fromEvent(timesButton, "click")
	.subscribe(event => {
		timerSubscription.unsubscribe()
	})
