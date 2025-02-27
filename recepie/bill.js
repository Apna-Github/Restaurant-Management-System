const selectedOptions = new Map();

        function toggleSelection(optionText, price) {
            const img = Array.from(document.querySelectorAll('.image-buttons img')).find(img => img.alt === optionText);
            
            if (selectedOptions.has(optionText)) {
                selectedOptions.delete(optionText);
                img.classList.remove('selected');
            } else {
                selectedOptions.set(optionText, price);
                img.classList.add('selected');
            }
            updateSelectedOptions();
            updateQuantitySelectors();
            updateTotalBill();
        }

        function updateSelectedOptions() {
            const selectedOptionsDiv = document.getElementById('selectedOptions');
            const options = Array.from(selectedOptions.keys()).join(', ');
            selectedOptionsDiv.textContent = `Selected Options: ${options || 'None'}`;
        }

        function updateQuantitySelectors() {
            const quantitySelectorsDiv = document.getElementById('quantitySelectors');
            quantitySelectorsDiv.innerHTML = ''; // Clear previous selectors
            
            selectedOptions.forEach((price, optionText) => {
                const label = document.createElement('label');
                label.textContent = `Quantity for ${optionText}: `;
                
                const select = document.createElement('select');
                select.setAttribute('data-option', optionText);
                
                for (let i = 1; i <= 10; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    select.appendChild(option);
                }
                
                select.addEventListener('change', updateTotalBill);
                
                label.appendChild(select);
                quantitySelectorsDiv.appendChild(label);
                quantitySelectorsDiv.appendChild(document.createElement('br'));
            });
        }

        function updateTotalBill() {
            const totalBillDiv = document.getElementById('totalBill');
            let total = 0;
            
            selectedOptions.forEach((price, optionText) => {
                const select = document.querySelector(`select[data-option="${optionText}"]`);
                const quantity = parseInt(select.value);
                total += price * quantity;
            });
            
            totalBillDiv.textContent = `Total Bill: $${total.toFixed(2)}`;
        }

        function pay(method) {
            const total = document.getElementById('totalBill').textContent;
            alert(`Payment Method: ${method}\n${total}`);
        }

        function printBill() {
            const billContent = `
                <h1>Bill Summary</h1>
                <div>${document.getElementById('selectedOptions').innerHTML}</div>
                <div>${document.getElementById('quantitySelectors').innerHTML}</div>
                <div>${document.getElementById('totalBill').innerHTML}</div>
            `;
            const printWindow = window.open('', '', 'height=600,width=800');
            printWindow.document.write('<html><head><title>Print Bill</title></head><body>');
            printWindow.document.write(billContent);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }

        function goBack() {
            window.history.back();
        }