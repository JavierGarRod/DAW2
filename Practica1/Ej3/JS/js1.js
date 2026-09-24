var num1=prompt("Ingrese el primer número: ");
var num2=prompt("Ingrese el segundo número: ");

if(num2 == 0){
    alert("No se puede dividir entre cero");
}
else{
    alert("El resultado de la suma es: " + (parseInt(num1) + parseInt(num2)));
    alert("El resultado de la resta es: " + (parseInt(num1) - parseInt(num2)));
    alert("El resultado de la multiplicación es: " + (parseInt(num1) * parseInt(num2)));
    alert("El resultado de la división es: " + (parseInt(num1) / parseInt(num2)));
}