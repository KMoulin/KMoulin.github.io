/// UI Object ///
class GUIObject {
  constructor(x, y, dx, dy) {
    this.posX = x;
    this.posY = y;
    this.h = dx;
    this.l = dy;
    this.isSelected = false;
    this.childSelected = false;
    this.isLocked = false;
    this.isLooper = false;
    this.col = [random(0, 255), random(0, 255), random(0, 255)];
    this.dx = 0;
    this.dy = 0;
  }
  shapeShow() {
    rect(this.posX + this.dx, this.posY, this.l, this.h);
  }
  show(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    if (!this.isSelected) {
      this.posY = this.dy;
    }
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    if (this.isLocked) {
      stroke(255, 0, 0);
      strokeWeight(4);
    } else {
      stroke(0);
      strokeWeight(2);
    }

    this.shapeShow();

    return this.h;
  }
  showGap(dx, dy) {
    return 0;
  }

  isClick(moX, moY) {
    if (moX >= this.posX + this.dx && moX <= this.posX + this.dx + this.l) {
      if (moY >= this.posY && moY <= this.posY + this.h) {
        return true;
      }
    }
    return false;
  }

  unselect() {
    this.isSelected = false;
  }
  dragged(dx, dy) {
    this.posY += dy;
  }
  intersect(ob) {
    if (
      this.posX < ob.posX + ob.duration &&
      this.posX + this.duration > ob.posX + ob.duration
    ) {
      return true;
    }
    if (this.posX < ob.posX && this.posX + this.duration > ob.posX) {
      return true;
    }
    return false;
  }
}

class Probe extends GUIObject {
  constructor(x, y) {
    super(x, y, 80, 100);
    this.r = (3 * this.l) / 6;
    this.isLooper = false;
    this.col = color(random(0, 255), random(0, 255), random(0, 255));
  }
  shapeShow() {
    rect(
      this.posX + this.dx,
      this.posY + this.h / 4,
      this.l,
      (3 * this.h) / 4,
      5
    );
    rect(
      this.posX + this.dx + (2 * this.l) / 6,
      this.posY,
      (2 * this.l) / 6,
      this.h,
      5
    );
    rect(
      this.posX + this.dx,
      this.posY + this.h / 4,
      this.l,
      (3 * this.h) / 4,
      5
    );
    fill(256, 256, 256, 256);
    circle(
      this.posX + this.dx + this.l / 2,
      this.posY + (3 * this.h) / 5,
      this.r
    );
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    circle(
      this.posX + this.dx + this.l / 2,
      this.posY + (3 * this.h) / 5,
      this.r / 2
    );

    fill(255, 0, 0);
    circle(
      this.posX + this.dx + this.l / 2 + this.r / 2,
      this.posY + (3 * this.h) / 5 - this.r / 2 + 5,
      this.r / 10
    );
  }

  showGap(dx, dy) {
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    if (this.isLocked) {
      stroke(255, 0, 0);
      strokeWeight(4);
    } else {
      stroke(0);
      strokeWeight(2);
    }
    line(
      this.posX + this.dx + 5,
      this.posY + 5 + this.h,
      this.posX + this.dx + 5,
      dy - 5
    );

    rect(this.posX + this.dx, dy + this.h / 4, this.l, (3 * this.h) / 4, 5);
    rect(
      this.posX + this.dx + (2 * this.l) / 6,
      dy,
      (2 * this.l) / 6,
      this.h,
      5
    );
    rect(this.posX + this.dx, dy + this.h / 4, this.l, (3 * this.h) / 4, 5);
    fill(256, 256, 256, 256);
    circle(this.posX + this.dx + this.l / 2, dy + (3 * this.h) / 5, this.r);
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    circle(this.posX + this.dx + this.l / 2, dy + (3 * this.h) / 5, this.r / 2);

    fill(255, 0, 0);
    circle(
      this.posX + this.dx + this.l / 2 + this.r / 2,
      dy + (3 * this.h) / 5 - this.r / 2 + 5,
      this.r / 10
    );
    return this.h;
  }
}

/// LOOPER CLASS ///
class Looper extends GUIObject {
  constructor(x, y) {
    super(x, y, 40, 200);
    this.isLooper = true;
  }

  showGap(dx, dy) {
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    if (this.isLocked) {
      stroke(255, 0, 0);
      strokeWeight(4);
    } else {
      stroke(0);
      strokeWeight(2);
    }
    line(
      this.posX + this.dx + 5,
      this.posY + 5 + this.h,
      this.posX + this.dx + 5,
      dy - 5
    );
    rect(this.posX + this.dx, dy, this.l, this.h);
    return this.h;
  }
}

/// Module ///
class Module extends GUIObject {
  constructor(x, y) {
    super(x, y, 500, 800);
    this.Rf = [];
    this.Gx = [];
    this.Gy = [];
    this.Gz = [];
    this.Eval = [];
    this.axis = [];
    this.spacingX = 20;
    this.spacingY = 100;
    this.col = [256, 256, 256];
    // print(this.posX);
    let tmp = new Gradient(0, 0, 1, random(-50, 50));
    this.Gx.push(tmp);
    tmp = new Gradient(0, 0, 2, random(-50, 50));
    this.Gy.push(tmp);
    tmp = new Gradient(0, 0, 3, random(-50, 50));
    this.Gz.push(tmp);
    tmp = new RF(0, 0, 0, -50);
    this.Rf.push(tmp);
    tmp = new ADC(300, 0, 0, -50);
    this.Rf.push(tmp);
  }
  show(dx, dy) {
    let h = super.show(dx, dy);
    for (let p = 0; p < this.Gx.length; p++) {
      this.Gx[p].show(
        this.posX + this.spacingX + dx,
        this.posY + this.spacingY * 2
      );
    }
    for (let p = 0; p < this.Gy.length; p++) {
      this.Gy[p].show(
        this.posX + this.spacingX + dx,
        this.posY + this.spacingY * 3
      );
    }
    for (let p = 0; p < this.Gz.length; p++) {
      this.Gz[p].show(
        this.posX + this.spacingX + dx,
        this.posY + this.spacingY * 4
      );
    }
    for (let p = 0; p < this.Rf.length; p++) {
      this.Rf[p].show(
        this.posX + this.spacingX + dx,
        this.posY + this.spacingY * 1
      );
    }
    for (let p = 1; p < 5; p++) {
      line(
        this.posX + this.dx + this.spacingX,
        this.posY + this.spacingY * p,
        this.posX + 20 + 700 + this.dx,
        this.posY + this.spacingY * p
      );
    }
    return h;
  }
  isClick(moX, moY) {
    if (this.isLocked) {
      for (let p = 0; p < this.Gx.length; p++) {
        if (this.Gx[p].isClick(moX, moY)) {
          this.Gx[p].isSelected = true;
          this.childSelected = true;
        }
      }
      for (let p = 0; p < this.Gy.length; p++) {
        if (this.Gy[p].isClick(moX, moY)) {
          this.Gy[p].isSelected = true;
          this.childSelected = true;
        }
      }
      for (let p = 0; p < this.Gz.length; p++) {
        if (this.Gz[p].isClick(moX, moY)) {
          this.Gz[p].isSelected = true;
          this.childSelected = true;
        }
      }
      for (let p = 0; p < this.Rf.length; p++) {
        if (this.Rf[p].isClick(moX, moY)) {
          this.Rf[p].isSelected = true;
          this.childSelected = true;
        }
      }
    }
    if (!this.childSelected) {
      return super.isClick(moX, moY);
    } else {
      return false;
    }
  }
  unselect() {
    this.isSelected = false;
    this.childSelected = false;
    for (let p = 0; p < this.Gx.length; p++) {
      this.Gx[p].unselect();
    }
    for (let p = 0; p < this.Gy.length; p++) {
      this.Gy[p].unselect();
    }
    for (let p = 0; p < this.Gz.length; p++) {
      this.Gz[p].unselect();
    }
    for (let p = 0; p < this.Rf.length; p++) {
      this.Rf[p].unselect();
    }
  }
  dragged(dx, dy) {
    if (this.isSelected) {
      this.posY += dy;
    }
    if (this.isLocked) {
      let intersect = false;
      let ob;
      let other;
      for (ob of this.Gx) {
        intersect = false;
        for (other of this.Gx) {
          if (ob != other) {
            if (!ob.intersect(other)) {
              intersect = true;
            }
          }
        }
        if (!intersect) {
          ob.dragged(dx, dy);
        }
      }
      for (ob of this.Gy) {
        intersect = false;
        for (other of this.Gy) {
          if (ob != other) {
            if (!ob.intersect(other)) {
              intersect = true;
            }
          }
        }
        if (!intersect) {
          ob.dragged(dx, dy);
        }
      }
      for (ob of this.Gz) {
        intersect = false;
        for (other of this.Gz) {
          if (ob != other) {
            if (!ob.intersect(other)) {
              intersect = true;
            }
          }
        }
        if (!intersect) {
          ob.dragged(dx, dy);
        }
      }

      for (ob of this.Rf) {
        intersect = false;
        for (other of this.Rf) {
          if (ob != other) {
            intersect = ob.intersect(other, dx, dy);
          }
        }
        if (!intersect) {
          ob.dragged(dx, dy);
        }
      }
    }
  }
}

/// Gradient ///
class Gradient extends GUIObject {
  constructor(x, y, axis, amp) {
    super(x, y, amp, 200);

    this.posY = y;
    this.posX = x;

    this.amp = amp;
    this.ramp1 = 50;
    this.flat = 100;
    this.ramp2 = 50;
    this.axis = axis;
    this.duration = this.ramp1 + this.flat + this.ramp2;
    this.shiftX = 0;
    this.shiftY = 0;
    this.col = [255, 255, 255];
  }
  show(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    stroke(0);
    strokeWeight(2);
    quad(
      this.posX + this.dx,
      this.posY + this.dy, // begining of the ramp
      this.posX + this.ramp1 + this.dx,
      this.posY + this.amp + this.dy, // end of the ramp, begining of the flat
      this.posX + this.flat + this.ramp1 + this.dx,
      this.posY + this.amp + this.dy,
      this.posX + this.ramp1 + this.flat + this.ramp2 + this.dx,
      this.posY + this.dy
    );
  }

  isClick(moX, moY) {
    if (moX >= this.posX + this.dx && moX <= this.posX + this.l + this.dx) {
      if (
        moY >= this.posY + this.dy &&
        moY <= this.posY + this.h + this.dy &&
        this.amp > 0
      ) {
        return true;
      }
      if (
        moY >= this.posY + this.h + this.dy &&
        moY <= this.posY + this.dy &&
        this.amp < 0
      ) {
        return true;
      }
    }
    return false;
  }
  dragged(dx, dy) {
    if (this.isSelected) {
      this.posX += dx;
      if (this.posX < 0) {
        this.posX = 0;
      }
      if (this.posX > 1000) {
        this.posX = 1000;
      }
    }
  }
  intersect(ob, dx, dy) {
    if (this.posX + dx > ob.posX && this.posX + dx < ob.posX + ob.duration) {
      return true;
    }
    if (
      this.posX + this.duration + dx > ob.posX &&
      this.posX + this.duration + dx < ob.posX + ob.duration
    ) {
      return true;
    }
    return false;
  }
  //let posX,posY;
}

class RF extends Gradient {
  constructor(x, y, axis, amp) {
    super(x, y, axis, amp);

    this.ramp1 = 0;
    this.flat = 200;
    this.ramp2 = 0;
    this.px = [];
    this.py = [];
    this.dT = 1;
    this.nPoint = this.duration / this.dT;
    let tmpx = 0;
    for (let pt = 0; pt < this.nPoint; pt++) {
      tmpx = pt * this.dT;
      this.px[pt] = tmpx;
      tmpx = pt * this.dT - this.duration / 2;
      if (tmpx == 0) {
        this.py[pt] = this.amp;
      } else {
        this.py[pt] = (this.amp * sin(tmpx / 8)) / (tmpx / 8);
      }
    }
    // this.col=[random(0,255),random(0,255),random(0,255)];
  }
  show(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    stroke(0);
    strokeWeight(2);
    beginShape();
    for (let pt = 0; pt < this.nPoint; pt++) {
      curveVertex(this.posX + this.px[pt] + dx, this.posY + this.py[pt] + dy);
    }

    endShape();
  }
  isClick(moX, moY) {
    if (moX >= this.posX + this.dx && moX <= this.posX + this.l + this.dx) {
      if (moY >= this.posY + this.dy && moY <= this.posY + this.h + this.dy) {
        return true;
      }
      if (moY >= this.posY + this.h + this.dy && moY <= this.posY + this.dy) {
        return true;
      }
    }
    return false;
  }
}

class ADC extends Gradient {
  constructor(x, y, axis, amp) {
    super(x, y, axis, amp);

    this.ramp1 = 0;
    this.flat = 200;
    this.ramp2 = 0;
    // this.col=[random(0,255),random(0,255),random(0,255)];
  }
}
