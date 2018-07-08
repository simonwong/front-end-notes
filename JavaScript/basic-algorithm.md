

# JS基础算法
## 快速排序 ##

> 排序思想：
> （1）在数据集之中，选择一个元素作为"基准"（pivot）。
> （2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
> （3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

```js
var quickSort = function (arr) {
	if (arr.length <= 1) { return arr; }
	
	var pivotIndex = Math.floor(arr.length / 2);
	var pivot = arr.splice(pivotIdenx, 1)[0];
	var left = [];
	var right = [];

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}

	return quickSort(left).concat([pivot], quickSort(right));
};
```

## 杨辉三角 ##

> 二项式系数在三角形中的一种集合排列。

```js
var row = 8,
	arry = [];

for (var i = 0; i < row; i++) {
	var arrySon = [];

	for (var j = 0; j < i - 1; j++) {
		if (i === 0 || j === 0 || j === i) {
			arrySon.push(1);
		} else {
			arrySon.push(arry[i-1][j-1] + arry[i-1][j]);
		}
	}
	console.log(arrySon);
	arry.push(arrySon);
}
```

结果
![杨辉三角结果](http://i1.piimg.com/567571/58ef25d8a9a9729c.jpg)

## 冒泡排序 ##

> 原理在于逐个双双检测，交换两两大小。

```js
var arr = [48, 30, 35, 3, 17];

for (var i = 0; i < arr.length; i++) {
	for (var j = 0; j < arr.length - i - 1; j++) {
		if (arr[j] > arr[j+1]) {
			var temp = arr[j+1];
			arr[j+1] = arr[j];
			arr[j] = temp;
		}
	}
}
console.log(arr); // [3, 17, 30, 35, 48]
```

## 二分算法 ##

> 不断对折，判断当前值对于检索值得大小。只能用于已经排序好的

```js
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var getIndex = function (list, num) {
	var len = list.length,
		st = 0,
		end = len - 1;

	while (st <= end) {
		var mid = Math.floor((st + end) / 2);

		if (num === list[mid]) {
			return mid;
		} else if (num > mid) {
			st = mid + 1;
		} else {
			end = mid - 1;
		}
	}
	return -1;
}
console.log(getIndex(arr, 6));
```

## Object去重 ##

> 给对象添加属性，相同属性的对象会覆盖

```js
var a = [1, 2, 5, 6],
	b = [0, 2, 4, 6, 9],
	c = a.concat(b),
	obj = {},
	arr = [];

c.map(function (item) {
	obj[item] = null; // 给obj添加属性
})

for (var key in obj) {
	if (obj.hasOwnProperty(key)) {
		arr.push(Number(key));
	}
}
console.log(arr);	// [0, 1, 2, 4, 5, 6, 9]
```

