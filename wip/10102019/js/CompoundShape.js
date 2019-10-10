class CompoundShape extends THREE.Object3D{
	constructor(width, height, depth, seed){
		super();
		this.colour1 = 0x00ff00;
		this.colour2 = 0x000000;
		this.colour3 = 0xff0000;
		this.colour4 = 0xffff00;
		this.seed1 = this.nextSeed(seed);
		this.seed2 = this.nextSeed(this.seed1);
		this.seed3 = this.nextSeed(this.seed2);
		this.seed4 = this.nextSeed(this.seed3);
		this.seed5 = this.nextSeed(this.seed4);
		this.seed6 = this.nextSeed(this.seed5);
		this.seed7 = this.nextSeed(this.seed6);
		this.seed8 = this.nextSeed(this.seed7);
		this.seed9 = this.nextSeed(this.seed8);
		this.seed10 = this.nextSeed(this.seed9);
		this.seed11 = this.nextSeed(this.seed10);
		this.width = width/2 + (width/2)*this.seed4;
		this.height = height/2 +(height/2)*this.seed5;
		this.depth = depth/2 +(depth/2)*this.seed6;
		console.log(this.seed11, this.seed10, this.seed9, this.seed8, this.seed7);
		this.widthA = this.width*this.seed1;
		this.widthB = this.width*(1-this.seed1);
		this.widthAR = this.width*this.seed8;
		this.widthBR = this.width*(1-this.seed8);
		console.log(this.seed4, this.seed5, this.seed6)
		this.heightA = this.height*this.seed2;
		this.heightB = this.height*(1-this.seed2);
		this.depthA = this.depth*this.seed3;
		this.depthB = this.depth*(1-this.seed3);

		this.mutations = [0,1,2,0,1,2,0,1];
		this.highestM = 6;

		this.mutations[0] = Math.ceil(this.seed1*this.highestM);
		this.mutations[1] = Math.ceil(this.seed2*this.highestM);
		this.mutations[2] = Math.ceil(this.seed3*this.highestM);
		this.mutations[3] = Math.ceil(this.seed4*this.highestM);
		this.mutations[4] = Math.ceil(this.seed5*this.highestM);
		this.mutations[5] = Math.ceil(this.seed6*this.highestM);
		this.mutations[6] = Math.ceil(this.seed7*this.highestM);
		this.mutations[7] = Math.ceil(this.seed8*this.highestM);

		// 3 7 1 5 
		if((this.mutations[1]==3)&&(this.widthA<this.width*0.6)){this.mutations[1]=1};
		if((this.mutations[3]==3)&&(this.widthA<this.width*0.6)){this.mutations[3]=1};
		if((this.mutations[7]==3)&&(this.widthA<this.width*0.6)){this.mutations[7]=1};
		if((this.mutations[5]==3)&&(this.widthA<this.width*0.6)){this.mutations[5]=2};

		//0 2 4 6
		if((this.mutations[0]==3)&&(this.widthB<this.width*0.6)){this.mutations[0]=2};
		if((this.mutations[2]==3)&&(this.widthB<this.width*0.6)){this.mutations[2]=4};
		if((this.mutations[4]==3)&&(this.widthB<this.width*0.6)){this.mutations[4]=2};
		if((this.mutations[6]==3)&&(this.widthB<this.width*0.6)){this.mutations[6]=4};

		if (this.mutations[1] == this.mutations[2] ) {this.mutations[2]=0};
		if (this.mutations[3] == this.mutations[4] ) {this.mutations[4]=0};
		if (this.mutations[5] == this.mutations[6] ) {this.mutations[5]=0};
		if (this.mutations[7] == this.mutations[0] ) {this.mutations[7]=0};

		if(this.mutations.reduce((a,b)=>a+b)==0){
			this.mutations[2] = 2;
		}

		this.mesh = new THREE.Mesh();
		this.solidmeshcontainer = new THREE.Mesh();
		this.linemeshcontainer = new THREE.Mesh();
		this.dlinemeshcontainer = new THREE.Mesh();
		this.solidmesh = new THREE.Mesh();
		this.linemesh = new THREE.Mesh();
		this.dlinemesh = new THREE.Mesh();
		this.solidmeshcontainer.add(this.solidmesh);
		this.linemeshcontainer.add(this.linemesh);
		this.dlinemeshcontainer.add(this.dlinemesh);
		this.add(this.mesh);
		this.mesh.add(this.solidmeshcontainer);
		this.mesh.add(this.linemeshcontainer);
		this.mesh.add(this.dlinemeshcontainer);
		this.createBack();
		this.createFront();

		this.solidmesh.position.x = this.linemesh.position.x = this.dlinemesh.position.x = (this.widthA-this.widthB)/2;
		this.solidmesh.position.y = this.linemesh.position.y = this.dlinemesh.position.y = (this.heightB-this.heightA)/2;
		this.solidmesh.position.z = this.linemesh.position.z = this.dlinemesh.position.z = (this.depthA-this.depthB)/2;
	}


	createFront(){
		var frontleft   = this.createCornerSolid(-this.widthA, this.heightA, this.depthB,  this.mutations[3]); this.solidmesh.add(frontleft);
		var frontright  = this.createCornerSolid(this.widthB, this.heightA,  this.depthB,  this.mutations[4]); this.solidmesh.add(frontright);
		var lfrontleft  = this.createCornerLines(-this.widthA, this.heightA, this.depthB,  this.mutations[3]); this.linemesh.add(lfrontleft);
		var lfrontright = this.createCornerLines(this.widthB, this.heightA,  this.depthB,  this.mutations[4]); this.linemesh.add(lfrontright);
		var lfrontleft  = this.createCornerLines(-this.widthA, this.heightA,  this.depthB, this.mutations[3], true); this.dlinemesh.add(lfrontleft);
		var lfrontright = this.createCornerLines(this.widthB, this.heightA,   this.depthB, this.mutations[4], true); this.dlinemesh.add(lfrontright);
		var bfrontleft   = this.createCornerSolid(-this.widthA,  -this.heightB,  this.depthB,  this.mutations[7]);   this.solidmesh.add(bfrontleft);
		var bfrontright  = this.createCornerSolid(this.widthB,  -this.heightB,   this.depthB,  this.mutations[0]);   this.solidmesh.add(bfrontright);
		var blfrontleft  = this.createCornerLines(-this.widthA, -this.heightB,    this.depthB, this.mutations[7]); this.linemesh.add(blfrontleft);
		var blfrontright = this.createCornerLines(this.widthB, -this.heightB,     this.depthB, this.mutations[0]); this.linemesh.add(blfrontright);
		var blfrontleft  = this.createCornerLines(-this.widthA, -this.heightB,    this.depthB, this.mutations[7], true); this.dlinemesh.add(blfrontleft);
		var blfrontright = this.createCornerLines(this.widthB, -this.heightB,     this.depthB, this.mutations[0], true); this.dlinemesh.add(blfrontright);

	}

	createBack(){
		var backleft    = this.createCornerSolid(-this.widthA, this.heightA, -this.depthA, this.mutations[1]); this.solidmesh.add(backleft);
		var backright   = this.createCornerSolid(this.widthB, this.heightA,  -this.depthA, this.mutations[2]); this.solidmesh.add(backright);
		var lbackleft   = this.createCornerLines(-this.widthA, this.heightA, -this.depthA, this.mutations[1]); this.linemesh.add(lbackleft);
		var lbackright  = this.createCornerLines(this.widthB, this.heightA,  -this.depthA, this.mutations[2]); this.linemesh.add(lbackright);
		var lbackleft   = this.createCornerLines(-this.widthA, this.heightA, -this.depthA, this.mutations[1], true); this.dlinemesh.add(lbackleft);
		var lbackright  = this.createCornerLines(this.widthB, this.heightA,  -this.depthA, this.mutations[2], true); this.dlinemesh.add(lbackright);
		var bbackleft    = this.createCornerSolid(-this.widthA,   -this.heightB, -this.depthA, this.mutations[5]);  this.solidmesh.add(bbackleft);
		var bbackright   = this.createCornerSolid(this.widthB,   -this.heightB,  -this.depthA, this.mutations[6]);  this.solidmesh.add(bbackright);
		var blbackleft   = this.createCornerLines(-this.widthA,  -this.heightB,  -this.depthA, this.mutations[5]); this.linemesh.add(blbackleft);
		var blbackright  = this.createCornerLines(this.widthB,  -this.heightB,   -this.depthA, this.mutations[6]); this.linemesh.add(blbackright);
		var blbackleft   = this.createCornerLines(-this.widthA,  -this.heightB,  -this.depthA, this.mutations[5], true); this.dlinemesh.add(blbackleft);
		var blbackright  = this.createCornerLines(this.widthB,  -this.heightB,   -this.depthA, this.mutations[6], true); this.dlinemesh.add(blbackright);

	}


	createCornerSolid(width, height, depth, mut){
		var mesh;
		var geometry;
		if (mut==0||mut==3){
			mesh = new THREE.Mesh();
			var panel1 = this.createPanel(Math.abs(width), Math.abs(height)); mesh.add(panel1);
			var panel2 = this.createPanel(Math.abs(depth), Math.abs(height)); mesh.add(panel2);
			var panel3 = this.createPanel(Math.abs(width), Math.abs(depth)); mesh.add(panel3);
			panel1.position.z = depth;
			panel1.position.x = width/2;
			panel1.position.y = height/2;
			panel2.rotation.y = 1.57079632679;
			panel2.position.x = width;
			panel2.position.y = height/2;
			panel2.position.z = depth/2;
			panel3.rotation.x = 1.57079632679;
			panel3.position.y = height;
			panel3.position.x = width/2;
			panel3.position.z = depth/2;
			if(mut==3){
				var cylindergeometry = new THREE.CylinderBufferGeometry( Math.abs(width/4), Math.abs(width/4), Math.abs(width/2), 16, 1 , false, 0, 4.71238898037);
				var cylindermaterial = new THREE.MeshBasicMaterial( {color: this.colour1} );
				var cylinder = new THREE.Mesh( cylindergeometry, cylindermaterial );
				cylinder.position.z = depth;
				cylinder.position.x = width/2;
				cylinder.position.y = height;
				cylinder.rotation.z = 1.57079632679;
				if(depth>0&&height<0){
					cylinder.rotation.x = 3.14159265;
				} else if(depth>0){
					cylinder.rotation.x = 1.57079632679} else if(height<0){
						cylinder.rotation.x = 4.71238898037};
				mesh.add( cylinder );
			}
	  	} else if (mut==1){
	  		geometry = new THREE.Geometry();
    		geometry.vertices.push(
        		new THREE.Vector3(0, height, 0),
        		new THREE.Vector3(0, height*1.5, depth),
        		new THREE.Vector3(width, height*1.5, depth),
        		new THREE.Vector3(width, height, 0),
        		new THREE.Vector3(width, 0, 0),
        		new THREE.Vector3(width, 0, depth),
        		new THREE.Vector3(0, 0, depth),
        		new THREE.Vector3(0, height, depth )
        	);
    		geometry.faces.push(
        		new THREE.Face3(0, 1, 3),
        		new THREE.Face3(3, 1, 2),
        		new THREE.Face3(0, 7, 1),
        		new THREE.Face3(1, 6, 5),
        		new THREE.Face3(1, 5, 2),
        		new THREE.Face3(2, 5, 3),
        		new THREE.Face3(3, 5, 4)
        	);
    		geometry.computeVertexNormals();
    		var material = new THREE.MeshBasicMaterial( {color: this.colour1, side: THREE.DoubleSide} );
			mesh = new THREE.Mesh( geometry, material );
	  	}  else if (mut==5||mut==6){
	  		geometry = new THREE.Geometry();
    		geometry.vertices.push(
        		new THREE.Vector3(0, height, 0),
        		new THREE.Vector3(width, height, 0),
        		new THREE.Vector3(width, height, depth/10),
        		new THREE.Vector3(width/10, height, depth/10),
        		new THREE.Vector3(width/10, height, depth),
        		new THREE.Vector3(0, height, depth),
        		new THREE.Vector3(0, 0, depth),
        		new THREE.Vector3(width, 0, depth),
        		new THREE.Vector3(width/10, height+height/10, depth),
        		new THREE.Vector3(width, height+height/10, depth),
        		new THREE.Vector3(width, height+height/10, depth/10),
        		new THREE.Vector3(width, 0, 0 ),
        		new THREE.Vector3(width/10, height+height/10, depth/10)
        	);
    		geometry.faces.push(
        		new THREE.Face3(0, 1, 2),
        		new THREE.Face3(0, 2, 3),
        		new THREE.Face3(0, 3, 4),
        		new THREE.Face3(0, 4, 5),
        		new THREE.Face3(4, 5, 6),
        		new THREE.Face3(4, 6, 8),
        		new THREE.Face3(8, 6, 7),
        		new THREE.Face3(9, 8, 7),
        		new THREE.Face3(9, 7, 10),
        		new THREE.Face3(7, 10, 11),
        		new THREE.Face3(10, 2, 11),
        		new THREE.Face3(11, 2, 1),
        		new THREE.Face3(3, 4, 8),
        		new THREE.Face3(3, 8, 12),
        		new THREE.Face3(2, 3, 12),
        		new THREE.Face3(2, 12, 10),
        		new THREE.Face3(9, 12, 8),
        		new THREE.Face3(9, 10, 12)

        	);
    		geometry.computeVertexNormals();
    		var material = new THREE.MeshBasicMaterial( {color: this.colour1, side: THREE.DoubleSide} );
			mesh = new THREE.Mesh( geometry, material );
	  	}else if (mut==2||mut==4){
	  		geometry = new THREE.Geometry();
    		geometry.vertices.push(
        		new THREE.Vector3(0, height, 0),
        		new THREE.Vector3(width, height, 0),
        		new THREE.Vector3(width, height, depth/10),
        		new THREE.Vector3(width/10, height, depth/10),
        		new THREE.Vector3(width/10, height, depth),
        		new THREE.Vector3(0, height, depth),
        		new THREE.Vector3(0, 0, depth),
        		new THREE.Vector3(width, 0, depth),
        		new THREE.Vector3(width/10, height/10, depth),
        		new THREE.Vector3(width, height/10, depth),
        		new THREE.Vector3(width, height/10, depth/10),
        		new THREE.Vector3(width, 0, 0 ),
        		new THREE.Vector3(width/10, height/10, depth/10)
        	);
    		geometry.faces.push(
        		new THREE.Face3(0, 1, 2),
        		new THREE.Face3(0, 2, 3),
        		new THREE.Face3(0, 3, 4),
        		new THREE.Face3(0, 4, 5),
        		new THREE.Face3(4, 5, 6),
        		new THREE.Face3(4, 6, 8),
        		new THREE.Face3(8, 6, 7),
        		new THREE.Face3(9, 8, 7),
        		new THREE.Face3(9, 7, 10),
        		new THREE.Face3(7, 10, 11),
        		new THREE.Face3(10, 2, 11),
        		new THREE.Face3(11, 2, 1),
        		new THREE.Face3(3, 4, 8),
        		new THREE.Face3(3, 8, 12),
        		new THREE.Face3(2, 3, 12),
        		new THREE.Face3(2, 12, 10),
        		new THREE.Face3(9, 12, 8),
        		new THREE.Face3(9, 10, 12)

        	);
    		geometry.computeVertexNormals();
    		var material = new THREE.MeshBasicMaterial( {color: this.colour1, side: THREE.DoubleSide} );
			mesh = new THREE.Mesh( geometry, material );
	  	}
		return (mesh);
	}

	createCornerLines(width, height, depth, mut, altline){
		var multoff = 300;
		var xoffset = width/multoff;
		var yoffset = height/multoff;
		var zoffset = depth/multoff;
		var mesh;
		if (mut==0){
			mesh  = new THREE.Mesh();
			var line1 = this.createLine(Math.abs(width), altline); mesh.add(line1);
			line1.rotation.z = 1.57079632679;
			line1.position.z = depth;
			line1.position.x =width/2;
			line1.position.x +=Math.abs(width/2);
			line1.position.y = height;
			var line2 = this.createLine(Math.abs(height), altline); mesh.add(line2);
			line2.position.x = width;
			line2.position.z = depth;
			line2.position.y = height/2;
			line2.position.y -= Math.abs(height/2);
			var line3 = this.createLine(Math.abs(depth), altline);  mesh.add(line3);
			line3.rotation.x = 1.57079632679;
			line3.position.y = height;
			line3.position.x = width;
			line3.position.z = depth/2;
			line3.position.z -= Math.abs(depth/2);
		} else if (mut==3){
			mesh  = new THREE.Mesh();

			var line1 = this.createLine(Math.abs(width/4), altline); mesh.add(line1);
			line1.rotation.z = 1.57079632679;
			line1.position.z = depth;
			line1.position.x =width/2;
			line1.position.x +=Math.abs(width/2);
			line1.position.x -= 3*(Math.abs(width/4));
			line1.position.y = height;

			var line4 = this.createLine(Math.abs(width/4), altline); mesh.add(line4);
			line4.rotation.z = 1.57079632679;
			line4.position.z = depth;
			line4.position.x =width/2;
			line4.position.x +=Math.abs(width/2);
			line4.position.y = height;

			var line5 = this.createLine(Math.abs(width/2), altline); mesh.add(line5);
			line5.rotation.z = 1.57079632679;
			line5.position.z = depth;
			if(depth<0){line5.position.z +=Math.abs(width/3.9)} else {line5.position.z -=Math.abs(width/3.9)}
			line5.position.x =width/2;
			line5.position.x +=Math.abs(width/2);
			line5.position.x -= (Math.abs(width/4));
			line5.position.y = height;

			var line6 = this.createLine(Math.abs(width/2), altline); mesh.add(line6);
			line6.rotation.z = 1.57079632679;
			line6.position.z = depth;
			line6.position.x =width/2;
			line6.position.x +=Math.abs(width/2);
			line6.position.x -= (Math.abs(width/4));
			line6.position.y = height;
			if(height<0){line6.position.y +=Math.abs(width/3.9)} else {line6.position.y -=Math.abs(width/3.9)}

			var line2 = this.createLine(Math.abs(height), altline); mesh.add(line2);
			line2.position.x = width;
			line2.position.z = depth;
			line2.position.y = height/2;
			line2.position.y -= Math.abs(height/2);

			var line3 = this.createLine(Math.abs(depth), altline);  mesh.add(line3);
			line3.rotation.x = 1.57079632679;
			line3.position.y = height;
			line3.position.x = width;
			line3.position.z = depth/2;
			line3.position.z -= Math.abs(depth/2);
			var pacmanmaterial;
			var pacmangeometry = new THREE.CircleGeometry( Math.abs(width/4), 16 , 3.1415926536, 4.71238898037);

			if(altline){
				 	pacmanmaterial = new THREE.LineDashedMaterial( { transparent:true, opacity:0.2,color: this.colour2 ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.1});
				} else {
				 	pacmanmaterial = new THREE.LineBasicMaterial( { color: this.colour2 } );
				}
			var pacmanedges = new THREE.EdgesGeometry( pacmangeometry );

			var pacman = new THREE.LineSegments( pacmanedges, pacmanmaterial );
			//var pacman = new THREE.Mesh( pacmangeometry, pacmanmaterial );
			mesh.add( pacman );

			pacman.position.z = depth*1.005;;
				pacman.position.x = width/2;
				pacman.position.y = height*1.005;
				pacman.rotation.y = 1.57079632679;
				pacman.rotation.z = 1.57079632679;
				if(depth>0&&height<0){
					pacman.rotation.x = 3.14159265;
				} else if(depth>0){
					pacman.rotation.x = 1.57079632679} else if(height<0){
					pacman.rotation.x = 4.71238898037
				};

			if(altline){
				pacman.computeLineDistances();
			};

			var pacman2=pacman.clone();
			pacman2.position.x+=width/3.9;
			pacman.position.x-=width/3.9;
			mesh.add( pacman2 );

		} else if (mut==1){
    		var geometry = new THREE.Geometry();
    		geometry.vertices.push(
        		new THREE.Vector3(0, height, 0),
        		new THREE.Vector3(0, height*1.5, depth),
        		new THREE.Vector3(width, height*1.5, depth),
        		new THREE.Vector3(width, height, 0),
        		new THREE.Vector3(0, height, 0),
        		new THREE.Vector3(0, height, depth ),
        		new THREE.Vector3(0, height*1.5, depth),
        		new THREE.Vector3(width, height*1.5, depth),
        		new THREE.Vector3(width, 0, depth)
        	);

    		var material;
			if(altline){
				material = new THREE.LineDashedMaterial( { transparent:true, opacity:0.2,color: this.colour2 ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.1});
			} else {
				material = new THREE.LineBasicMaterial({ color: this.colour2 });
			}
			mesh = new THREE.Line( geometry, material );

			if(altline){mesh.computeLineDistances();} else {

			}
							mesh.position.x+=xoffset;
				mesh.position.y+=yoffset;
				mesh.position.z+=zoffset;
		} else if (mut==5||mut==6){
			geometry = new THREE.Geometry();
    		geometry.vertices.push(
        		new THREE.Vector3(width, height, 0),
        		new THREE.Vector3(width, height, depth/10),
        		new THREE.Vector3(width/10, height, depth/10),
        		new THREE.Vector3(width/10, height, depth),
        		new THREE.Vector3(0, height, depth),
        		new THREE.Vector3(width/10, height, depth),
        		new THREE.Vector3(width/10, height+height/10, depth),
        		new THREE.Vector3(width, height+height/10, depth),
        		new THREE.Vector3(width, 0, depth),
        		new THREE.Vector3(width, height+height/10, depth),
        		new THREE.Vector3(width, height+height/10, depth/10),
        		new THREE.Vector3(width/10, height+height/10, depth/10),
        		new THREE.Vector3(width/10, height, depth/10),
        		new THREE.Vector3(width/10, height+height/10, depth/10),
        		new THREE.Vector3(width, height+height/10, depth/10),
        		new THREE.Vector3(width, height, depth/10),
        		new THREE.Vector3(width, height+height/10, depth/10),
        		new THREE.Vector3(width/10, height+height/10, depth/10),
        		new THREE.Vector3(width/10, height+height/10, depth)


        	);
        	var material;
			if(altline){
				material = new THREE.LineDashedMaterial( { transparent:true, opacity:0.3,color: this.colour2 ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.1});
			} else {
				material = new THREE.LineBasicMaterial({ color: this.colour2 });
			}
			mesh = new THREE.Line( geometry, material );

			if(altline){mesh.computeLineDistances();} else {
				//mesh.position.y+=yoffset;

			}
							mesh.position.x+=xoffset;
				mesh.position.y+=yoffset;
				mesh.position.z+=zoffset;
		} else if (mut==2||mut==4){
			geometry = new THREE.Geometry();
    		geometry.vertices.push(
        		new THREE.Vector3(width, height, 0),
        		new THREE.Vector3(width, height, depth/10),
        		new THREE.Vector3(width/10, height, depth/10),
        		new THREE.Vector3(width/10, height, depth),
        		new THREE.Vector3(0, height, depth),
        		new THREE.Vector3(width/10, height, depth),
        		new THREE.Vector3(width/10, height/10, depth),
        		new THREE.Vector3(width, height/10, depth),
        		new THREE.Vector3(width, 0, depth),
        		new THREE.Vector3(width, height/10, depth),
        		new THREE.Vector3(width, height/10, depth/10),
        		new THREE.Vector3(width/10, height/10, depth/10),
        		new THREE.Vector3(width/10, height, depth/10),
        		new THREE.Vector3(width/10, height/10, depth/10),
        		new THREE.Vector3(width, height/10, depth/10),
        		new THREE.Vector3(width, height, depth/10),
        		new THREE.Vector3(width, height/10, depth/10),
        		new THREE.Vector3(width/10, height/10, depth/10),
        		new THREE.Vector3(width/10, height/10, depth)


        	);
        	var material;
			if(altline){
				material = new THREE.LineDashedMaterial( { transparent:true, opacity:0.3,color: this.colour2 ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.1});
			} else {
				material = new THREE.LineBasicMaterial({ color: this.colour2 });
			}
			mesh = new THREE.Line( geometry, material );
			if(altline){mesh.computeLineDistances();} else {
				
				//mesh.position.y+=yoffset;

			}
			mesh.position.x+=xoffset;
			mesh.position.y+=yoffset;
			mesh.position.z+=zoffset;
		}
		return (mesh);
	}

	createPanel(width, height){
		//var randcol = Math.floor(10+Math.random()*90);
		//var col = "#" + randcol + "ff" + randcol;
		var geometry = new THREE.PlaneGeometry( width, height, 2 );
		var material = new THREE.MeshBasicMaterial( {color: this.colour1, side: THREE.DoubleSide} );
		var plane = new THREE.Mesh( geometry, material );
		return( plane );
	}

	createLine(length, altline = false){
		var material;
		if(altline){
			material = new THREE.LineDashedMaterial( { transparent:true, opacity:0.3,color: this.colour2 ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.1});
		} else {
			material = new THREE.LineBasicMaterial({ color: this.colour2 });
		}

		var geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3( 0, 0, 0 ),
			new THREE.Vector3( 0, length, 0 )
		);
		var line = new THREE.Line( geometry, material );
		line.computeLineDistances();
		return( line );
	}

	nextSeed(seed){
		var seedtt = seed*10;
		var seedttf = Math.floor(seedtt);
		var nextSeed = seedtt-seedttf;
		if(nextSeed>0.75){nextSeed-=0.25};
		if(nextSeed<0.25){nextSeed+=0.25}
		return(nextSeed);
	}
}