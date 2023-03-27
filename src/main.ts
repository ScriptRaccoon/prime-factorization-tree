import "./style.css";
import pf from "primes-and-factors";

const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;

const numberInput = document.querySelector(
	"input"
) as HTMLInputElement;

const factors_element = document.getElementById("factors")!;

function draw_binary_tree(n: number) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const factors = pf.getFactors(n);
	factors_element.innerHTML = n + " = " + factors.join(" &times; ");
	recursive_draw_binary_tree(
		factors,
		canvas.width / 2,
		5,
		0,
		canvas.width,
		factors.length
	);
}

function recursive_draw_binary_tree(
	array: number[],
	x: number,
	y: number,
	x_min: number,
	x_max: number,
	factor_amount: number
): void {
	if (array.length == 0) return;

	const [factor, ...rest] = array;

	const width = (x_max - x_min) / factor;

	for (let i = 0; i < factor; i++) {
		const x_min_new = x_min + i * width;
		const x_max_new = x_min + (i + 1) * width;

		const x_new = (x_min_new + x_max_new) / 2;
		const y_new = y + (canvas.height - 10) / factor_amount;

		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x_new, y_new);
		ctx.stroke();
		ctx.closePath();

		recursive_draw_binary_tree(
			rest,
			x_new,
			y_new,
			x_min_new,
			x_max_new,
			factor_amount
		);
	}
}

function init() {
	numberInput.addEventListener("change", update_number);
	adjust_canvas();
	window.addEventListener("resize", adjust_canvas);
	update_number();
}

init();

function update_number() {
	const number = numberInput.valueAsNumber;
	if (number >= 2) {
		draw_binary_tree(number);
	} else {
		window.alert("Only numbers >= 2 are not allowed");
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
