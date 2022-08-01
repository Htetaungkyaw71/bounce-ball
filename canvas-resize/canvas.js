let canvas = document.querySelector("canvas")
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;


let c = canvas.getContext("2d");

let mouse = {
    x:undefined,
    y:undefined
}
var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


window.addEventListener("mousemove",(event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
})



function Circle(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minradius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function (){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.fillStyle = this.color
        c.fill()
    }
    this.update = function (){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0 ){
            dx = -dx
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0 ){
            this.dy = -this.dy
        }  
        this.x += this.dx
        this.y += this.dy

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50)
            {
                if(this.radius < 40){
                    this.radius += 1
                }
                
            }
        else if(this.radius > this.minradius){
            this.radius -= 1
        }


        this.draw();
      
    }
}

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;
    init()
})

let circleArray = [];
function init(){
    circleArray = [];
    for(let i=0; i< 1000; i++)
    {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let dx = Math.random() - 0.5;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dy = Math.random() - 0.5;
        
        circleArray.push(new Circle(x,y,dx,dy,radius))
    }
    
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight)

    for(let i=0; i < circleArray.length; i++)
    {
        circleArray[i].update()
    }
  
}
animate()
init()



