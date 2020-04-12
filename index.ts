import {interval, Subject} from "rxjs";
import {take, multicast, refCount, publish, share, publishLast, publishBehavior, publishReplay} from "rxjs/operators";

const source$ = interval(1000).pipe(
	take(4),
	// multicast(new Subject()),
	// publishLast(),
	// publishBehavior(42),
	publishReplay(),
	refCount(),
	// share()
);

source$.subscribe(v => console.log("Ob 1:", v));

setTimeout(() => {
	source$.subscribe(v => console.log("Ob 2:", v));
}, 1000)

setTimeout(() => {
	source$.subscribe(v => console.log("Ob 3:", v));
}, 2000)

setTimeout(() => {
	source$.subscribe({
		next: v => console.log("Ob 4:", v),
		complete: () => console.log("com 4")
	});
}, 5000)
