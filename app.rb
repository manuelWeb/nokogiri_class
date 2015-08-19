# encoding: UTF-8
require 'slim'
require 'htmlbeautifier' 
require 'nokogiri'
Slim::Engine.set_options pretty: true, sort_attrs: false

class Slimed
  attr_accessor :src, :out
  def initialize(src,out)
    @src = src
    @out = out
  end
  def tohtml
    # ouverture src en lecture
    srcfile = File.open(src, "rb").read
    s2h = Slim::Template.new{srcfile}
    htmlrender = s2h.render
    beautiful = HtmlBeautifier.beautify(htmlrender, tab_stops: 2)
    # ecriture du fichier out = Slimed.new(src,**out**) > return beautiful
    File.open(out, "w") do |go|
      go.puts beautiful
    end
  end
end
fr = Slimed.new('indexC.slim', 'indexC.html')
fr.tohtml

class ToHtmlProd
  attr_accessor :srcHtml, :srcJs
  def initialize(srcHtml,srcJs)
    @srcHtml = srcHtml
    @srcJs = srcJs    
  end
  def toHtmlFragment
    file =  File.read(srcHtml)
    doc = Nokogiri::HTML(file, nil, "UTF-8")
    frag = doc.at_css(".centralEvent")
    # puts "\ncode indexC.html frag : \n\n #{frag}  \n"
    # puts "\ncode indexC.html full : \n\n #{doc}  \n"
    srcJs1 = doc.at_css(srcJs[0])
    srcJs2 = doc.at_css(srcJs[1])
    srcJs3 = doc.at_css(srcJs[2])
    # compil JS + HTML
    File.open("index.html", "w") do |file|
      # **placer le script JS en debut de document
      file.puts "#{srcJs1}\n#{srcJs2}\n#{srcJs3}"
      file.puts "#{frag}"
    end
    a = File.read("index.html").force_encoding("UTF-8")
    # **attention** CODAGE a compléter (GSUB)
    a = a.gsub(/(<img.*?)>/,'\1 />').gsub('é','&eacute;').gsub('è','&egrave;').gsub('ë','&euml;').gsub('ç','&ccedil;').gsub('à','&agrave;').gsub('ï','&iuml;').gsub('ù','&ugrave;').gsub('â','&acirc;').gsub('ê','&ecirc;').gsub('î','&icirc;').gsub('ô','&ocirc;').gsub('û','&ucirc;').gsub('€','&euro;').gsub('<br>',' <br />')
    File.open("index.html", "w").puts a
  end
end

frprod = ToHtmlProd.new('indexC.html',['[src~="jquery.easing.1.3.js"]','[src~="cookie_evt.js"]','[src~="anime_content-bt.js"]'])
frprod.toHtmlFragment