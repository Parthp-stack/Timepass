let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    this.paper = paper;
    this.paper.style.transform = `rotate(${this.rotation}deg)`;

    this.paper.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.paper.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });

    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });

    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('touchend', this.onTouchEnd.bind(this));
  }

  onMouseDown(e) {
    this.holdingPaper = true;
    this.mouseTouchX = e.clientX;
    this.mouseTouchY = e.clientY;

    this.bringToFront();
  }

  onTouchStart(e) {
    e.preventDefault();
    this.holdingPaper = true;
    const touch = e.touches[0];
    this.mouseTouchX = touch.clientX;
    this.mouseTouchY = touch.clientY;

    this.bringToFront();
  }

  onMouseMove(e) {
    this.updateMousePosition(e.clientX, e.clientY);
    this.drag();
  }

  onTouchMove(e) {
    if (!this.holdingPaper) return;
    const touch = e.touches[0];
    this.updateMousePosition(touch.clientX, touch.clientY);
    this.drag();
  }

  onMouseUp() {
    this.holdingPaper = false;
  }

  onTouchEnd() {
    this.holdingPaper = false;
  }

  updateMousePosition(clientX, clientY) {
    this.mouseX = clientX;
    this.mouseY = clientY;

    this.velX = this.mouseX - this.prevMouseX;
    this.velY = this.mouseY - this.prevMouseY;

    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;
  }

  drag() {
    if (!this.holdingPaper) return;

    const dx = this.mouseX - this.mouseTouchX;
    const dy = this.mouseY - this.mouseTouchY;

    this.currentPaperX += dx;
    this.currentPaperY += dy;

    this.mouseTouchX = this.mouseX;
    this.mouseTouchY = this.mouseY;

    this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
  }

  bringToFront() {
    highestZ += 1;
    this.paper.style.zIndex = highestZ;
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
