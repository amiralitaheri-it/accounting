import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import Num2persian from "num2persian";

window.Num2persian = Num2persian;
window.Alpine = Alpine;

Alpine.plugin(persist);

document.addEventListener("alpine:init", () => {
  Alpine.data("costData", function () {
    return {
      cost: {
        typeOfCost: "درآمد",
        price: 0,
        day: 1,
        month: 1,
        year: 1401,
        description: "",
      },

      costCount: this.$persist(0),
      incomeCount: this.$persist(0),
      costArray: [],

      deleteCostItem(data, index) {
        this.formData = this.formData.filter((data, dataIndex) => {
          return index !== dataIndex;
        });

        console.log(data.cost.typeOfCost);

        if (data.cost.typeOfCost == "درآمد") {
          this.incomeCount -= data.cost.price;
          return;
        }

        if (data.cost.typeOfCost == "هزینه") {
          this.costCount -= data.cost.price;
          return;
        }
      },

      formData: this.$persist([]),
      storeDataToLocalStorage() {
        this.formData.push({
          cost: this.cost,
        });

        this.costArray = this.formData.filter((formData, dataIndex) => {
          return formData.cost.typeOfCost == "درآمد";
        });

        this.costArray.forEach((item) => {
          this.incomeCount += item.cost.price;
        });

        this.cost = {
          typeOfCost: "درآمد",
          price: 0,
          day: 1,
          month: 1,
          year: 1401,
          description: "",
        };
      },
    };
  });
});

Alpine.start();
