import "./style.css";
import pf from "primes-and-factors";

const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;

const input = document.querySelector("input")!;
const factors_element = document.getElementById("factors")!;

function draw_tree(n: number) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const factors = pf.getFactors(n);
	factors_element.innerHTML = "= " + factors.join(" &times; ");
	const threshold = 5;
	const step = (canvas.height - 2 * threshold) / factors.length;
	recursive_draw_tree(
		factors,
		[canvas.width / 2, threshold],
		[0, canvas.width],
		step
	);
}

function recursive_draw_tree(
	array: number[],
	pos: [number, number],
	region: [number, number],
	step: number
): void {
	if (array.length == 0) return;
	const [first, ...rest] = array;
	const [_, y] = pos;
	const [a, b] = region;
	const width = (b - a) / first;
	for (let i = 0; i < first; i++) {
		const c = a + i * width;
		const d = c + width;
		const next_region: [number, number] = [c, d];
		const target: [number, number] = [(c + d) / 2, y + step];
		ctx.beginPath();
		ctx.moveTo(...pos);
		ctx.lineTo(...target);
		ctx.stroke();
		ctx.closePath();
		recursive_draw_tree(rest, target, next_region, step);
	}
}

function update_number() {
	const number = input.valueAsNumber;
	if (number >= 2 && number == Math.floor(number)) {
		draw_tree(number);
	} else {
		window.alert("Only whole numbers > 1 are allowed");
	}
}

function adjust_canvas() {
	factors_element.innerHTML = "";
	canvas.width = Math.min(800, 0.8 * window.innerWidth);
	canvas.height = 0.75 * canvas.width;
	ctx.strokeStyle = "#fff";
	ctx.lineWidth = 2;
	ctx.lineCap = "round";
}

function init() {
	adjust_canvas();
	update_number();
	window.addEventListener("resize", adjust_canvas);
	input.addEventListener("change", update_number);
}

init();
