(function(){
  function Starfield(el){
    this.el = el;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '0';
    document.body.appendChild(this.canvas);
    this.stars = [];
    this.running = true;
    this.dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    var media = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reduced = media.matches;
    var self = this; media.addEventListener('change', function(e){ self.reduced = e.matches; });
    this.resize();
    this.tick = this.tick.bind(this);
    requestAnimationFrame(this.tick);
    window.addEventListener('resize', this.resize.bind(this));
  }
  Starfield.prototype.resize = function(){
    var w = window.innerWidth, h = window.innerHeight;
    this.canvas.width = Math.floor(w * this.dpr);
    this.canvas.height = Math.floor(h * this.dpr);
    this.count = Math.max(180, Math.min(520, Math.floor((w * h) * 0.0006)));
    this.stars.length = 0;
    for (var i=0;i<this.count;i++){
      var s = { x: Math.random()*this.canvas.width, y: Math.random()*this.canvas.height, z: Math.random(), r: (Math.random()*1.8+0.5)*this.dpr, tw: Math.random()*Math.PI*2, sp: (Math.random()*0.35+0.12) };
      this.stars.push(s);
    }
  };
  Starfield.prototype.tick = function(){
    if (!this.running) return;
    var c = this.ctx, w = this.canvas.width, h = this.canvas.height;
    c.clearRect(0,0,w,h);
    for (var i=0;i<this.stars.length;i++){
      var s = this.stars[i];
      var a = this.reduced ? 0.6 : (0.6 + Math.sin(s.tw)*0.35);
      c.globalAlpha = a;
      c.fillStyle = '#ffffff';
      c.beginPath();
      c.arc(s.x, s.y, s.r, 0, Math.PI*2);
      c.fill();
      if (!this.reduced){ s.tw += 0.03; s.x += s.sp; if (s.x > w) s.x = 0; }
    }
    if (!this.reduced) requestAnimationFrame(this.tick); else setTimeout(this.tick, 200);
  };
  new Starfield(document.body);
})();
