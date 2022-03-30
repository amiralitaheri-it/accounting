import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import Num2persian from "num2persian";
import Swal from "sweetalert2";
import Chart from "chart.js/auto";

Alpine.plugin(persist);

window.Num2persian = Num2persian;
window.Alpine = Alpine;
window.Swal = Swal;
window.Chart = Chart;

document.addEventListener("alpine:init", () => {
  Alpine.data("costData", function () {
    return {
      cost: {
        type: "درآمد",
        price: 0,
        day: 1,
        month: 1,
        year: 1401,
        description: "",
      },

      formData: this.$persist([]),
      totalIncomes: this.$persist(0),
      totalCosts: this.$persist(0),
      incomeArray: Alpine.$persist([]),
      costArray: Alpine.$persist([]),

      sumIncome() {
        this.totalIncomes = this.incomeArray.reduce(
          (prev, curr) => prev + curr,
          0
        );
        return this.totalIncomes;
      },

      sumCost() {
        this.totalCosts = this.costArray.reduce((prev, curr) => prev + curr, 0);
        return this.totalCosts;
      },

      deleteCostItem(data, index) {
        this.formData = this.formData.filter((data, dataIndex) => {
          return index !== dataIndex;
        });

        if (data.cost.type == "درآمد") {
          this.totalIncomes -= data.cost.price;
          this.incomeArray.splice(this.incomeArray.indexOf(data.cost.price), 1);
        }

        if (data.cost.type == "هزینه") {
          this.totalCosts -= data.cost.price;
          this.costArray.splice(this.costArray.indexOf(data.cost.price), 1);
        }

        this.sweetalert("حذف با موفقیت انجام شد", "success");
      },

      storeDataToLocalStorage() {
        this.formData.push({
          cost: this.cost,
        });

        if (this.cost.type == "درآمد") {
          this.incomeArray.push(this.cost.price);
          this.sumIncome();
        }

        if (this.cost.type == "هزینه") {
          this.costArray.push(this.cost.price);
          this.sumCost();
        }

        this.cost = {
          type: "درآمد",
          price: 0,
          day: 1,
          month: 1,
          year: 1401,
          description: "",
        };

        this.sweetalert("عملیات با موفقیت انجام شد", "success");
      },

      sweetalert(message, status) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1800,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: status,
          title: message,
        });
      },
    };
  });
});

window.number_format = function (number, decimals, dec_point, thousands_point) {
  if (number == null || !isFinite(number)) {
    throw new TypeError("number is not valid");
  }

  if (!decimals) {
    var len = number.toString().split(".").length;
    decimals = len > 1 ? len : 0;
  }

  if (!dec_point) {
    dec_point = ".";
  }

  if (!thousands_point) {
    thousands_point = ",";
  }

  number = parseFloat(number).toFixed(decimals);

  number = number.replace(".", dec_point);

  var splitNum = number.split(dec_point);
  splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
  number = splitNum.join(dec_point);

  return number;
};

window.toPersianNum = function (num, dontTrim) {
  var i = 0,
    dontTrim = dontTrim || false,
    num = dontTrim ? num.toString() : num.toString().trim(),
    len = num.length,
    res = "",
    pos,
    persianNumbers =
      typeof persianNumber == "undefined"
        ? ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
        : persianNumbers;

  for (; i < len; i++)
    if ((pos = persianNumbers[num.charAt(i)])) res += pos;
    else res += num.charAt(i);

  return res;
};

/* -------------------------------- chart js -------------------------------- */
const labels = ["فروردین ۹۸", "اردیبهشت ۹۸", "خرداد ۹۸"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "درآمد",
      backgroundColor: "hsl(125, 100%, 50%)",
      borderColor: "hsl(125, 100%, 50%)",
      data: localStorage.getItem("_x_incomeArray"),
    },
    {
      label: "هزینه",
      backgroundColor: "hsl(0, 100%, 50%)",
      borderColor: "hsl(0, 100%, 50%)",
      data: localStorage.getItem("_x_costArray"),
    },
  ],
};

const configLineChart = {
  type: "line",
  data,
  options: {},
};

var chartLine = new Chart(
  document.getElementById("chartLine"),
  configLineChart
);

Alpine.start();
