/// <reference types="vite/client" />

declare module "primes-and-factors" {
	function getFactors(n: number): number[];
	export = { getFactors };
}
