function $(){
	return new Base();
}

function Base() {
	this.elements = [];
	this.getId=function (id) {
		this.elements.push(document.getElementById(id));
		return this;

	},

	this.getName=function(name){
		var names = document.getElementsByName(name);
		for (var i=0; i<names.length; i++ )	{
			this.elements.push(names[i]);
		}
		return this;
	},
	this.getTagName=function(tagName){
		var tags= document.getElementsByTagName(tagName)
		for (var i=0; i<tags.length; i++ )	{
			this.elements.push(tags[i]);
		}
		return this;
	}
};

Base.prototype.css =function(attr,value){
	
	for (var i = 0; i<this.elements.length; i++){
		this.elements[i].style[attr] = value;
	}
	return this;

}

Base.prototype.html=function(value){
for (var i = 0; i<this.elements.length; i++){
		this.elements[i].innerHTML = value;
	}
	return this;
}

Base.prototype.click=function(fn){
	for (var i = 0; i<this.elements.length; i++){
		this.elements[i].onclikc = fn;
	}
	return this;
}
