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

      deleteCostItem(index) {
        this.formData = this.formData.filter((data, dataIndex) => {
          return index !== dataIndex;
        });
      },

      formData: this.$persist([]),
      storeDataToLocalStorage() {
        this.formData.push({
          cost: this.cost,
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
