import {fromEvent, interval, Observable, of, throwError} from "rxjs";
import {mergeMap, map, filter, tap, catchError, take, takeUntil} from "rxjs/operators";
import {ajax} from "rxjs/ajax";

const timerButton = document.querySelector("#cancel");
const timerOutput = document.querySelector("#times");

const timer$ = new Observable(subscriber => {
	let i = 0;

	let id = setInterval(() => {
		subscriber.next(i++);
	}, 1000)

	return () => {
		console.log("End up!");
		clearInterval(id);
	}
});

const cancelTimer$ = fromEvent(timerButton, "click");

timer$.pipe(
	take(5)
).subscribe({
	next: val => {
		timerOutput.innerHTML += `${new Date().toLocaleTimeString()} (${val}) <br />`
	}
})

function grabByYear (year, log) {
	return source$ => source$.pipe(
		filter(book => book.publicationYear < year),
		tap(filteredBook => log ? console.log("--- filteredBook ----", filteredBook) : null)
	)
}

ajax("/api/books")
	.pipe(
		mergeMap(res => res.response),
		grabByYear(1950, true)
	)
	.subscribe(value => console.log(value))

