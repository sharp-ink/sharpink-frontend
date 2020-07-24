import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HtmlUtilService {

    /**
   * Cleans an HTML string to remove nbsp in empty paragraphs
   * @param htmlText an HTML string to clean
   * @returns the cleaned HTML string
   */
    cleanEmptyParagraphs(htmlText: string): string {
        return htmlText.replace('<p>&nbsp;</p>', '<p></p>');
    }

}
